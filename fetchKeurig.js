const axios = require('axios');
const cheerio = require('cheerio');

const fullUrl = 'https://www.amazon.com/Keurig-K-Mini-Single-Serve-Coffee/dp/B0FMTSRKYL/ref=zg_bsnr_c_home-garden_d_sccl_3/136-9393038-1765419?pd_rd_w=kNVFv&content-id=amzn1.sym.fef9af56-6177-46e9-8710-a5293a68dd39&pf_rd_p=fef9af56-6177-46e9-8710-a5293a68dd39&pf_rd_r=HAKD5VDZC7ZQE40515B0&pd_rd_wg=xCzXZ&pd_rd_r=d647c7a8-c15a-4a14-a38a-e13c5ccfdcf3&pd_rd_i=B0FMTSRKYL&th=1';

async function fetchProduct() {
    try {
        // Fetch the product page directly
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
            url: fullUrl, // Use the full URL as affiliate for now
            image: image,
            price: price
        };
    } catch (error) {
        console.error('Error fetching product:', error.message);
    }
}

fetchProduct().then(product => {
    if (product) {
        console.log(JSON.stringify(product, null, 2));
    }
});