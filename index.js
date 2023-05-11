const express = require('express');
const db = require('./models/firebase');
const {collection, getDocs, query, where} = require("firebase/firestore");
const bodyParser = require('body-parser');



// Express App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Listen for requests
app.listen(3000);


app.use(express.static('public'));

// Register View Engin
app.set('view engine', 'ejs');
app.set('views', 'html')


app.get('/', (req, res) => {
    res.render('index')
});

app.get('/about-us', (req, res) => {
    res.render('about-us')
});

app.get('/products', (req, res) => {

    const productssRef = collection(db, "products");
    getDocs(productssRef).then((querySnapshot) => {
        const products =  querySnapshot.docs;
        const filtered = ['Keyboards','Parts','Accessories'];

        res.render('products', {products, filtered})

      }).catch((error) => {
        console.log("Error getting documents: ", error);
      });
});

app.post('/products', (req, res) => {

    const productsRef = collection(db, "products");
    var filtered = req.body.productType;

    if (filtered == null) {
      filtered = [];
      var products = [];
      res.render('products', {products, filtered});

    } else {

      if(!Array.isArray(filtered)){
        filtered = [filtered];
      }

      const q = query(productsRef, where("type", "in", filtered));
      getDocs(q).then((querySnapshot) => {
        const products =  querySnapshot.docs;
        res.render('products', {products, filtered})

      }).catch((error) => {
        console.log("Error getting documents: ", error);
      });
    }
    
});

app.post('/add_order', (req, res) => {
  
});

app.get('/account-setting', (req, res) => {

    const ordersRef = collection(db, "orders");
    getDocs(ordersRef).then((querySnapshot) => {
        const orders =  querySnapshot.docs;
        res.render('account-setting', {orders})

      }).catch((error) => {
        console.log("Error getting documents: ", error);
      });

});

app.get('/cart-page-v3', (req, res) => {
    res.render('cart-page-v3')
});

app.get('/product-generic', (req, res) => {
    res.render('product-generic')
});






