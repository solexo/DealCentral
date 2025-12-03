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
    "name": "Hairmax PowerFlex 272 Laser Cap - FDA Cleared Thinning Hair Loss Solution for Men & Women",
    "url": "https://amzn.to/48siT70",
    "image": "https://m.media-amazon.com/images/I/41wCx1fhbQL._SY300_SX300_QL70_FMwebp_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/41wCx1fhbQL._SY300_SX300_QL70_FMwebp_.jpg"
    ],
    "price": "$199.00",
    "category": "Beauty & personal care",
    "review": "This laser cap uses FDA-cleared red light therapy to stimulate hair growth. It's comfortable, cordless, and easy to use with a 7-minute treatment time.",
    "pros": ["FDA cleared", "Cordless and flexible design", "Quick 7-minute sessions"],
    "cons": ["Requires consistent use", "Not covered by insurance"],
    "whyBuy": "Ideal for those seeking a non-invasive solution to hair thinning with proven technology.",
    "dealScore": 9.2,
    "editorPick": true
  },
  {
    "name": "Garmin Instinct Solar Rugged Outdoor Watch with GPS, Graphite",
    "url": "https://amzn.to/4pNRZO8",
    "image": "https://m.media-amazon.com/images/I/519pESH--lL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/519pESH--lL._AC_SY300_SX300_QL70_FMwebp_.jpg"
    ],
    "price": "$299.99",
    "category": "Electronics",
    "review": "A rugged smartwatch with solar charging, perfect for outdoor activities. Features built-in sports apps and health monitoring.",
    "pros": ["Solar charging", "Rugged design", "Built-in GPS"],
    "cons": ["Bulky design", "Limited app support"],
    "whyBuy": "Great for adventurers who need reliable tracking without worrying about battery life.",
    "dealScore": 9.5,
    "editorPick": true
  },
  {
    "name": "Hyperice Hypervolt 2 Pro Percussion Massage Gun",
    "url": "https://amzn.to/49SByeE",
    "image": "https://m.media-amazon.com/images/I/61jirA2o7nL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/61jirA2o7nL._AC_SY300_SX300_QL70_FMwebp_.jpg"
    ],
    "price": "$349.00",
    "category": "Fitness & health tools",
    "review": "A powerful massage gun with quiet operation and multiple speeds. Ideal for relieving muscle soreness and stiffness.",
    "pros": ["Quiet operation", "5 speeds and interchangeable heads", "FSA/HSA eligible"],
    "cons": ["Requires charging", "Heavy for some users"],
    "whyBuy": "Perfect for athletes and anyone needing deep tissue relief at home.",
    "dealScore": 9.0,
    "editorPick": false
  },
  {
    "name": "TheraGun Prime Massage Gun by Therabody",
    "url": "https://amzn.to/4rxA6EL",
    "image": "https://m.media-amazon.com/images/I/71d+MDU8ylL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/71d+MDU8ylL._AC_SY300_SX300_QL70_FMwebp_.jpg"
    ],
    "price": "$399.00",
    "category": "Fitness & health tools",
    "review": "Powerful deep tissue massage gun for reliable recovery and pain relief.",
    "pros": ["Deep tissue relief", "Durable design", "Multiple attachments"],
    "cons": ["Expensive", "Heavy"],
    "whyBuy": "Ideal for serious athletes needing professional-grade recovery tools.",
    "dealScore": 8.5,
    "editorPick": false
  },
  {
    "name": "Ekrin Athletics B37v2 Massage Gun",
    "url": "https://amzn.to/3M60RjA",
    "image": "https://m.media-amazon.com/images/I/61h+YqgodkL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/61h+YqgodkL._AC_SY300_SX300_QL70_FMwebp_.jpg"
    ],
    "price": "$149.99",
    "category": "Fitness & health tools",
    "review": "High-powered massage gun with brushless motor, 5 speeds, and 4 attachments for deep tissue relief.",
    "pros": ["Brushless motor", "5 speeds", "4 attachments", "Ultra quiet"],
    "cons": ["Pricey", "Heavy for some"],
    "whyBuy": "Ergonomic design for effective pain relief and muscle recovery.",
    "dealScore": 8.8,
    "editorPick": false
  },
  {
    "name": "Compex Sport Elite 3.0 Muscle Stimulator",
    "url": "https://amzn.to/4rxAfbh",
    "image": "https://m.media-amazon.com/images/I/714B214bb6L._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/714B214bb6L._AC_SY300_SX300_QL70_FMwebp_.jpg"
    ],
    "price": "$399.00",
    "category": "Fitness & health tools",
    "review": "Advanced muscle stimulator with multiple programs for performance enhancement and recovery.",
    "pros": ["10 programs", "Wireless", "Rechargeable"],
    "cons": ["Expensive", "Learning curve"],
    "whyBuy": "Ideal for athletes looking to improve muscle performance and recovery.",
    "dealScore": 8.8,
    "editorPick": false
  },
  {
    "name": "OMRON Max Power Relief TENS Unit",
    "url": "https://amzn.to/4rzOA6W",
    "image": "https://m.media-amazon.com/images/I/611Bb4mY5VL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/611Bb4mY5VL._AC_SY300_SX300_QL70_FMwebp_.jpg"
    ],
    "price": "$49.99",
    "category": "Fitness & health tools",
    "review": "Effective TENS unit for pain relief in various body parts.",
    "pros": ["Drug-free", "Easy to use", "Portable"],
    "cons": ["Batteries not included", "Not for all pain types"],
    "whyBuy": "Great for managing chronic pain without medication.",
    "dealScore": 8.5,
    "editorPick": false
  },
  {
    "name": "Omron Focus TENS Therapy for Knee Unit",
    "url": "https://amzn.to/3MzUIfu",
    "image": "https://m.media-amazon.com/images/I/61BP5EajOkL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/61BP5EajOkL._AC_SY300_SX300_QL70_FMwebp_.jpg"
    ],
    "price": "$79.99",
    "category": "Fitness & health tools",
    "review": "Wireless TENS unit specifically designed for knee pain relief.",
    "pros": ["Wireless", "Knee-specific", "Sweep waveform"],
    "cons": ["Single use", "Requires prescription in some areas"],
    "whyBuy": "Targeted relief for knee pain sufferers.",
    "dealScore": 8.0,
    "editorPick": false
  },
  {
    "name": "iReliev TENS + EMS Muscle Stimulator",
    "url": "https://amzn.to/48zTpEN",
    "image": "https://m.media-amazon.com/images/I/61VezFVfkqL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/61VezFVfkqL._AC_SY300_SX300_QL70_FMwebp_.jpg"
    ],
    "price": "$39.99",
    "category": "Fitness & health tools",
    "review": "Versatile TENS and EMS unit with 14 modes for pain relief and muscle recovery.",
    "pros": ["14 therapy modes", "Rechargeable", "Backlit display"],
    "cons": ["May be overwhelming for beginners", "Pads wear out"],
    "whyBuy": "Comprehensive device for both pain management and muscle building.",
    "dealScore": 8.7,
    "editorPick": false
  },
  {
    "name": "AUVON Rechargeable TENS Unit",
    "url": "https://amzn.to/4iyKSXn",
    "image": "https://m.media-amazon.com/images/I/71Vh6zkeETL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/71Vh6zkeETL._AC_SY300_SX300_QL70_FMwebp_.jpg"
    ],
    "price": "$29.99",
    "category": "Fitness & health tools",
    "review": "Affordable TENS unit with 24 modes and premium electrode pads.",
    "pros": ["24 modes", "Rechargeable", "Premium pads"],
    "cons": ["Basic design", "No EMS"],
    "whyBuy": "Budget-friendly option for effective pain relief.",
    "dealScore": 8.2,
    "editorPick": false
  },
  {
    "name": "BOB AND BRAD C2 Massage Gun",
    "url": "https://amzn.to/3KsRzNS",
    "image": "https://m.media-amazon.com/images/I/711wc7K7QML._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/711wc7K7QML._AC_SY300_SX300_QL70_FMwebp_.jpg"
    ],
    "price": "$199.99",
    "category": "Fitness & health tools",
    "review": "Powerful massage gun with 5 speeds and interchangeable heads, FSA/HSA approved.",
    "pros": ["5 speeds", "Interchangeable heads", "FSA/HSA eligible"],
    "cons": ["Heavy", "Noisy"],
    "whyBuy": "Professional-grade recovery tool for athletes and home use.",
    "dealScore": 9.0,
    "editorPick": true
  },
  {
    "name": "Pure Enrichment PureRelief XL Heating Pad",
    "url": "https://amzn.to/4pIhPD1",
    "image": "https://m.media-amazon.com/images/I/918L2JjRA5L._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/918L2JjRA5L._AC_SY300_SX300_QL70_FMwebp_.jpg"
    ],
    "price": "$39.99",
    "category": "Fitness & health tools",
    "review": "Large heating pad with 6 heat settings and moist heat option for pain relief.",
    "pros": ["Large size", "6 heat settings", "Moist heat"],
    "cons": ["Corded", "Not for all body parts"],
    "whyBuy": "Effective and affordable solution for back pain and cramps.",
    "dealScore": 8.5,
    "editorPick": false
  },
  {
    "name": "Ninja DZ201 Foodi 8 Quart 6-in-1 DualZone 2-Basket Air Fryer",
    "url": "https://amzn.to/48xpLjs",
    "image": "https://m.media-amazon.com/images/I/511+uXaPLlL._AC_SL1001_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/511+uXaPLlL._AC_SL1001_.jpg"
    ],
    "price": "$129.99",
    "category": "Home & kitchen gadgets",
    "review": "Versatile 6-in-1 air fryer with dual baskets for cooking multiple items simultaneously. Features Match Cook technology for perfect results.",
    "pros": ["Dual baskets", "6 cooking functions", "Match Cook technology"],
    "cons": ["Large footprint", "Learning curve for settings"],
    "whyBuy": "Ideal for families needing efficient, healthy cooking options.",
    "dealScore": 9.0,
    "editorPick": false
  },
  {
    "name": "DREAME X40 Ultra Robotic Vacuum with Removable & Liftable Mop",
    "url": "https://amzn.to/3MaGUbn",
    "image": "https://m.media-amazon.com/images/I/715PiEJ-NGL._AC_SL1500_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/715PiEJ-NGL._AC_SL1500_.jpg"
    ],
    "price": "$589.00",
    "category": "Home & kitchen gadgets",
    "review": "Advanced robotic vacuum with powerful suction, self-emptying, and mopping capabilities. Features auto-refill and self-cleaning.",
    "pros": ["12,000Pa suction", "Self-emptying", "Mopping function"],
    "cons": ["Expensive", "Requires app setup"],
    "whyBuy": "Perfect for hands-free home cleaning with advanced features.",
    "dealScore": 8.8,
    "editorPick": true
  }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { products, currentCategory: null });
});

app.get('/category/:category', (req, res) => {
  const category = req.params.category.replace(/-/g, ' '); // Handle URL encoding
  const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
  res.render('index', { products: filteredProducts, currentCategory: category });
});

// Export for Vercel
module.exports = app;

// For local development
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}