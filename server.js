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
  },
  {
    "name": "Hyperice Hypervolt 2 Pro - Featuring Quiet Glide Technology - Handheld Percussion Massage Gun - 5 Speeds, 5 Interchangeable Heads - Helps Relieve Sore Muscles and Stiffness FSA-HSA",
    "url": "https://amzn.to/49SByeE",
    "image": "https://m.media-amazon.com/images/I/61jirA2o7nL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "price": "Price not available"
  },
  {
    "name": "TheraGun Prime (6th Generation) Massage Gun by Therabody – Deep Tissue, Powerful Massage in a Rugged, Durable Design for Reliable Recovery & Pain Relief",
    "url": "https://amzn.to/4rxA6EL",
    "image": "https://m.media-amazon.com/images/I/71d+MDU8ylL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "price": "Price not available"
  },
  {
    "name": "Ekrin Athletics B37v2 Massage Gun - Deep Tissue Massage with High-Powered Brushless Motor - Ergonomic Back Massager for Pain Relief - 5 Speeds, 4 Attachments - Ultra Quiet Hand-Held Massager",
    "url": "https://amzn.to/3M60RjA",
    "image": "https://m.media-amazon.com/images/I/61h+YqgodkL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "price": "Price not available"
  },
  {
    "name": "Compex Sport Elite 3.0 Muscle Stimulator with TENS Kit, 10 Programs Helps facilitate and Improve Muscle Performance, Black",
    "url": "https://amzn.to/4rxAfbh",
    "image": "https://m.media-amazon.com/images/I/714B214bb6L._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "price": "Price not available"
  },
  {
    "name": "OMRON Max Power Relief TENS Unit Muscle Stimulator - Massage Therapy for Lower Back, Arm, Foot, Shoulder, and Arthritis Pain - Drug-Free Pain Relief",
    "url": "https://amzn.to/4rzOA6W",
    "image": "https://m.media-amazon.com/images/I/611Bb4mY5VL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "price": "Price not available"
  },
  {
    "name": "Omron Focus TENS Therapy for Knee Unit Wireless Muscle Stimulator with Sweep Waveform Technology, Medium, White",
    "url": "https://amzn.to/3MzUIfu",
    "image": "https://m.media-amazon.com/images/I/61BP5EajOkL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "price": "Price not available"
  },
  {
    "name": "iReliev TENS Unit + EMS Muscle Stimulator Comes with 14 Therapy Modes, Premium Pain Relief and Recovery System, Rechargeable, Large Back Lit Display, Large and Small Electrode Pads",
    "url": "https://amzn.to/48zTpEN",
    "image": "https://m.media-amazon.com/images/I/61VezFVfkqL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "price": "Price not available"
  },
  {
    "name": "AUVON Rechargeable TENS Unit Muscle Stimulator, 24 Modes 4th Gen TENS Machine with 8pcs 2\"x2\" Premium Electrode Pads for Pain Relief",
    "url": "https://amzn.to/4iyKSXn",
    "image": "https://m.media-amazon.com/images/I/71Vh6zkeETL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "price": "Price not available"
  },
  {
    "name": "BOB AND BRAD C2 Massage Gun, FSA Eligible & HSA Approved Deep Tissue Percussion Massager Gun, Muscle Massager with 5 Speeds and 5 Heads, Electric Back Massagers for Professional Athletes Home Gym",
    "url": "https://amzn.to/3KsRzNS",
    "image": "https://m.media-amazon.com/images/I/711wc7K7QML._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "price": "Price not available"
  },
  {
    "name": "Pure Enrichment® PureRelief XL Heating Pad - 12\" x 24\" Electric Heating Pad for Back Pain & Cramps, 6 Heat Settings, Soft Machine Wash Fabric, Auto-Off & Moist Heat (Blue)",
    "url": "https://amzn.to/4pIhPD1",
    "image": "https://m.media-amazon.com/images/I/918L2JjRA5L._AC_SY300_SX300_QL70_FMwebp_.jpg",
    "price": "Price not available"
  }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { products });
});

// Export for Vercel
module.exports = app;