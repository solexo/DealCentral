const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Products data - Amazon affiliate products
const products = [
  {
    "name": "Hairmax PowerFlex 272 Laser Cap - (FDA Cleared) Thinning Hair Loss Solution for Men & Women - Flexible Cordless Design With 7 Minute Treatment Time - Red Light Therapy to Stimulate Hair Growth",
    "url": "https://amzn.to/48siT70",
    "image": "https://m.media-amazon.com/images/I/41wCx1fhbQL._SY300_SX300_QL70_FMwebp_.jpg",
    "price": "Price not available"
  },
  {
    "name": "Garmin 010-02293-10 Instinct Solar, Rugged Outdoor Smartwatch with Solar Charging Capabilities, Built-in Sports Apps and Health Monitoring, Graphite",
    "url": "https://amzn.to/4pNRZO8",
    "image": "https://m.media-amazon.com/images/I/519pESH--lL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "price": "Price not available"
  }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { products });
});

// Export for Vercel
module.exports = app;