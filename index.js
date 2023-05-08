const express = require('express');
const mongoose = require('mongoose');
const Order = require('./models/order');
const { result } = require('lodash');
const { ObjectId } = require('mongodb');


// Express App
const app = express();
// Listen for requests
app.listen(3000);

// Connect  to MongoDB
const uri = "mongodb+srv://nawaf1:aa123456@cluster0.nfiupzt.mongodb.net/Keyboarders?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function connect(){
    try{
        await mongoose.connect(uri)
        console.log("Connected");
    } catch (error){
        console.error(error);
    }
}

connect();

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
    
    Order.find().then((orders) => {
        res.render('account-setting', {orders})

    }).catch((err)=> console.log(err));

});

app.get('/cart-page-v3', (req, res) => {
    res.render('cart-page-v3')
});

app.get('/product-generic', (req, res) => {
    res.render('product-generic')
});






