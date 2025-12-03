const axios = require('axios');
const cheerio = require('cheerio');

const affiliateUrl = 'https://amzn.to/4pNRZO8';

async function fetchProduct() {
    try {
        // First, resolve the shortened URL
        const response = await axios.get(affiliateUrl, { maxRedirects: 0, validateStatus: () => true });
        if (response.status >= 300 && response.status < 400) {
            const location = response.headers.location;
            console.log('Redirect to:', location);
            // Assume location is the full URL
            const fullUrl = location.startsWith('http') ? location : 'https://www.amazon.com' + location;
            console.log('Full URL:', fullUrl);

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
            const price = $('#priceblock_ourprice').text().trim() || $('#priceblock_dealprice').text().trim() || $('#corePrice_desktop .a-price .a-offscreen').text().trim() || 'Price not available';

            console.log('Title:', title);
            console.log('Image:', image);
            console.log('Price:', price);

            return {
                name: title,
                url: affiliateUrl,
                image: image,
                price: price
            };
        } else {
            console.log('No redirect, status:', response.status);
        }
    } catch (error) {
        console.error('Error fetching product:', error.message);
    }
}

fetchProduct();