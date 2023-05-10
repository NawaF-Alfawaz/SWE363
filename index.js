const express = require('express');
const mongoose = require('mongoose');
const Order = require('./models/order');
const db = require('./models/firebase');
const {collection, getDocs} = require("firebase/firestore");


// Express App
const app = express();
app.use(express.json());
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
    res.render('products')
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






