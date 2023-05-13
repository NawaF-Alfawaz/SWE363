const express = require('express');
const bodyParser = require('body-parser');
const {db, auth} = require('./models/firebase');
const {collection, getDocs, query, where, doc, getDoc, addDoc, updateDoc} = require("firebase/firestore");
const {signOut, signInWithEmailAndPassword} = require("firebase/auth");
// For signup
const admin = require("firebase-admin")
const serviceAccount = require("./keyboarders-26884-firebase-adminsdk-mahx7-9c67afc1e8.json");
admin.initializeApp({
credential: admin.credential.cert(serviceAccount)
})

let user = null;


// Express App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());



let cart = {"total": 0,"products":{}};

app.post('/cart/add', (req, res) => {
  const product = req.body;
  if (cart['products'][product.id]) {
    cart['products'][product.id].quantity += 1;
    cart['total'] = cart['total'] + product.price;
  } else {
    product['quantity'] = 1;
    cart['products'][product.id] = product;
    cart['total'] = cart['total'] + product.price;
  }

  res.send(cart);
});

app.get('/cart-page-v3', (req, res) => {

  if(user == null){
    res.render('login')
  }
  else{
    const customersRef  = collection(db, 'customers');
    const q = query(customersRef, where("id", "==", user.uid));
    getDocs(q).then((querySnapshot) => {
      customer =  querySnapshot.docs.forEach((cus)=>{
        customer = cus.data();
        res.render('cart-page-v3', {cart, customer})
      });
    });

  }

});

app.post('/add/order', (req, res) => {
  if(user.uid == null){
    console.log("Logged Out");
  } else {
    if(cart['total'] == 0){
      res.json({ message: "You did not add anything to the cart" });

    }else {
      const ordersRef = collection(db, "orders");
      addDoc(ordersRef, {
        customerId:user.uid,
        items: cart['products'],
        total: cart['total'],
      }).then(()=>{
        res.json({ message: "New order has been created" });
        cart = {"total": 0,"products":{}};
      });

    }

  }

});

// Listen for requests
app.listen(3000);


app.use(express.static('public'));

// Register View Engin
app.set('view engine', 'ejs');
app.set('views', 'html')


app.get('/', (req, res) => {
  const productssRef = collection(db, "products");
  getDocs(productssRef).then((querySnapshot) => {
      const products =  querySnapshot.docs;

      res.render('index', {products})

    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });
});



app.get('/about-us', (req, res) => {
    res.render('about-us')
});

app.post('/contact-us', (req, res) => {
  const contactUsRef = collection(db, "contactUs");
  addDoc(contactUsRef, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    message: req.body.message,
  });
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

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;

  const productsRef = collection(db, "products");

  const docRef = doc(productsRef, productId);
  getDoc(docRef).then((docSnapshot) => {
      const product = docSnapshot.data();
      
      res.render('product-generic', {product})

  }).catch((error) => {
      console.log("Error getting document: ", error);
  });

});

app.post('/products/filter', (req, res) => {

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

app.post('/products/search', (req, res) => {
  var searchWord = req.body.search;
  const filtered = ['Keyboards','Parts','Accessories'];
  const productsRef = collection(db, "products");

  const q = query(productsRef, where("title", ">=", searchWord), where("title", "<=", searchWord + "\uf8ff"));
      getDocs(q).then((querySnapshot) => {
        const products =  querySnapshot.docs;
        res.render('products', {products, filtered})

      }).catch((error) => {
        console.log("Error getting documents: ", error);
      });

  
  
});


app.get('/account-setting', (req, res) => {

  if(user == null){
    res.redirect('/login')
  }
  else{
    const ordersRef = collection(db, 'orders');
    const q1 = query(ordersRef, where("customerId", "==", user.uid));

    const customersRef  = collection(db, 'customers');
    const q2 = query(customersRef, where("id", "==", user.uid));

    getDocs(q1).then((querySnapshot) => {
      orders =  querySnapshot.docs;
      getDocs(q2).then((querySnapshot) => {
        customer =  querySnapshot.docs.forEach((cus)=>{
          customer = cus.data();
          res.render('account-setting', {orders, customer})
        });
      });
    });
  }
      


});

app.post('/account-setting/addresses/add', (req, res) => {
  const customersRef  = collection(db, 'customers');
    const q = query(customersRef, where("id", "==", user.uid));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.docs.forEach((cus)=>{
          const addresses = cus.data().addresses;
          addresses.push({
            city: req.body.city,
            name: req.body.name,
            address: req.body.address,
          });
          updateDoc(cus.ref, {
            addresses:addresses,
          });
          res.redirect('/account-setting');
        });
      });
});

app.get('/signup', (req, res) => {
  res.render('signup')
  })
  
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body; // Get form values
  console.log(email, password); // Debugging
  
  // Creating user
  const userRecord = await admin.auth().createUser({
  email,
  password,
  });
  console.log("User created: " + userRecord.uid);
  user = userRecord;
  
  const customersRef = collection(db, "customers");
  await addDoc(customersRef, {
  name: name,
  email: email,
  password: password,
  id: user.uid,
  addresses: []
  });
  res.redirect('/');
  
  });
  
  app.get('/login', (req, res) => {
  res.render('login')
  })
  
  app.post('/login', (req, res) => {

  const {email, password} = req.body;
  // Login
  signInWithEmailAndPassword(auth, email, password)
  .then(credentials => {
    user = credentials.user;
    res.redirect('/');
  })
  .catch(err => {
  console.log(err)
  })

  })