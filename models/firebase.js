const {initializeApp} = require("firebase/app");
const {getFirestore} = require("firebase/firestore");


const firebaseConfig = {
    apiKey: "AIzaSyCu8jSziKeo1N2b_T3ym1mdca1kSLa3yIw",
    authDomain: "keyboarders-26884.firebaseapp.com",
    projectId: "keyboarders-26884",
    storageBucket: "keyboarders-26884.appspot.com",
    messagingSenderId: "993756214030",
    appId: "1:993756214030:web:2369ea1c810e63a5d99d5f",
    measurementId: "G-TTW0MN3N06"
  };

initializeApp(firebaseConfig);

const db = getFirestore();
//getDocs(colRef).then((snapshot) => {
//  console.log(snapshot.docs);
//});

module.exports = db;