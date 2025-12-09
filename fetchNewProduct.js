const axios = require('axios');
const cheerio = require('cheerio');

const affiliateUrl = 'https://www.amazon.com/Meta-Quest-128GB-Cardboard-Exclusive-Oculus/dp/B0F2GYMC8H?pf_rd_p=2b46bcf8-ad8c-4e4b-bb3e-d4146d83a21c&pf_rd_r=70274V03QGVN3C78EW0Y&sr=1-7-969f4cb0-824d-4648-acec-369c6cfab238&th=1&linkCode=sl1&tag=dealcentra075-20&linkId=561c25ca1d7b8a0711be12d529886650&language=en_US&ref_=as_li_ss_tl';

async function fetchProduct() {
    try {
        // First, resolve the shortened URL
        const response = await axios.get(affiliateUrl, { maxRedirects: 0, validateStatus: () => true });
        let fullUrl;
        if (response.status >= 300 && response.status < 400) {
            const location = response.headers.location;
            console.log('Redirect to:', location);
            // Assume location is the full URL
            fullUrl = location.startsWith('http') ? location : 'https://www.amazon.com' + location;
            console.log('Full URL:', fullUrl);
        } else {
            console.log('No redirect, using direct URL, status:', response.status);
            fullUrl = affiliateUrl;
        }

        // Now fetch the product page
        const productResponse = await axios.get(fullUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            },
            timeout: 10000
        });

        const $ = cheerio.load(productResponse.data);

        const title = $('#productTitle').text().trim();
        let image = $('#landingImage').attr('src');
        if (!image) {
            image = $('#imgBlkFront').attr('src');
        }
        if (!image) {
            // Try other selectors
            image = $('img[data-image-index="0"]').attr('src') || $('img[alt*="product"]').attr('src');
        }

        // Get additional images
        const images = [];
        if (image) images.push(image);
        // Get all image sources from various selectors
        $('img[data-image-index], .a-dynamic-image, img[alt*="product"]').each((i, el) => {
            const src = $(el).attr('data-old-hires') || $(el).attr('src');
            if (src && src.includes('m.media-amazon.com') && !images.includes(src)) {
                images.push(src);
            }
        });
        // Limit to 3 images
        const limitedImages = images.slice(0, 3);

        const price = $('#priceblock_ourprice').text().trim() || $('#priceblock_dealprice').text().trim() || $('#corePrice_desktop .a-price .a-offscreen').text().trim() || 'Price not available';

        console.log('Title:', title);
        console.log('Image:', image);
        console.log('Price:', price);
        console.log('Images:', limitedImages);

        return {
            name: title,
            url: affiliateUrl,
            image: image,
            images: limitedImages,
            price: price
        };
    } catch (error) {
        console.error('Error fetching product:', error.message);
    }
}

fetchProduct().then(product => {
    if (product) {
        console.log('Fetched product:', JSON.stringify(product, null, 2));
    }
});