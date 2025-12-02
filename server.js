const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Read products from file
function readProducts() {
  try {
    const data = fs.readFileSync('products.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Write products to file
function writeProducts(products) {
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
}

// Routes
app.get('/', (req, res) => {
  const products = readProducts();
  res.render('index', { products });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});