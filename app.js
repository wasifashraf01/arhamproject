const firebaseConfig = {
  apiKey: "AIzaSyBcW95fUvPCdiiPtWA5gkxBNxyrYYBfssM",
  authDomain: "jacket-website.firebaseapp.com",
  projectId: "jacket-website",
  storageBucket: "jacket-website.firebasestorage.app",
  messagingSenderId: "750361879409",
  appId: "1:750361879409:web:32ed570710839c2b4e4cd0"
};

const frb = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function signup() {
     var email = document.getElementById("email");
     var password = document.getElementById("password");

       firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}

function login() {
     var email = document.getElementById("emaillogin");
     var password = document.getElementById("passwordlogin");

       firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    var user = userCredential.user;
    console.log(user);
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    
  });
}

// checkout
function checkout() {
firebase.database().ref("cartItems").once("value", snapshot => {
  const items = snapshot.val();
  if (items) {
    firebase.database().ref("orders").push({
      items,
      checkoutTime: new Date().toISOString()
    });
    firebase.database().ref("cartItems").remove();
    alert("✅ Checkout complete! Order saved in Firebase.");
  } else {
    alert("Your cart is empty.");
  }
});
}

// Add to cart
function addToCart(name, price, image) {
  const cartItem = {
    name: name,
    price: price,
    image: image,
    timestamp: new Date().toISOString()
  };

  firebase.database().ref("cartItems").push(cartItem)
  .then(() => {
    alert("🛍️ Item added to cart!");
  })
  .catch((error) => {
    console.error("Error adding item: ", error);
  });
}