const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Products data
const products = [
  {
    "name": "Wireless Bluetooth Headphones",
    "url": "https://example.com/product1",
    "image": "https://images-na.ssl-images-amazon.com/images/I/71qid7QFWJL._AC_SL1500_.jpg"
  },
  {
    "name": "Apple iPhone 14 Pro",
    "url": "https://example.com/product2",
    "image": "https://images-na.ssl-images-amazon.com/images/I/61XO4bORHVL._AC_SL1500_.jpg"
  },
  {
    "name": "Hairmax PowerFlex 272 Laser Cap - (FDA Cleared) Thinning Hair Loss Solution for Men & Women - Flexible Cordless Design With 7 Minute Treatment Time - Red Light Therapy to Stimulate Hair Growth",
    "url": "https://amzn.to/48siT70",
    "image": "https://m.media-amazon.com/images/I/41wCx1fhbQL._SY300_SX300_QL70_FMwebp_.jpg",
    "price": "Price not available"
  }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { products });
});

// Export for Vercel
module.exports = app;