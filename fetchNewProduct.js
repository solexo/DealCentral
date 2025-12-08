const axios = require('axios');
const cheerio = require('cheerio');

const affiliateUrl = 'https://www.amazon.com/Nutrafol-Supplements-Clinically-Dermatologist-Recommended/dp/B07QZ5CTTF/ref=sr_1_2_sspa?crid=2WCFVX508AVYZ&dib=eyJ2IjoiMSJ9.jmhc7mbmoxQezFum9AgeTkRn4SnKJoqM5EeckpWbJhGeELJrn5luSQWMAo0qd0exvtu8dfNFH3wzjHk26VEmHxihiKnSkeeNFLMaNdrwmuiOVihMHiYlTqM3TeDd4_wo-vjd34PrON5o10RgybGmsfQNYVnz8uNmjm12wZVmKM51X8_fZcKX3z_5bZ1qXaEmwH9VydIZRwygIFLAFUjPYbjzEx2VyppfFTpsaFwVGbWFE8r6L8EYUS36M-gRZ8MIlQ2ks466ZtG1qMmDhu7z3Ztm4m1GsvmdlAnoMIdq-KY.7fsDL0m0o7e94bnQPMhJnpTz7r9Vrl3Dtp2o2UXkSQw&dib_tag=se&keywords=hair&qid=1765219861&sprefix=hair%2Caps%2C943&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1';

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