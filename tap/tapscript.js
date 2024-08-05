// Ініціалізуємо Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBC6DE1C4XUXpU0JY0w1SVqweQTGtnFNx0",
    authDomain: "lq-cm-tst.firebaseapp.com",
    databaseURL: "https://lq-cm-tst-default-rtdb.firebaseio.com",
    projectId: "lq-cm-tst",
    storageBucket: "lq-cm-tst.appspot.com",
    messagingSenderId: "395966889397",
    appId: "1:395966889397:web:376f7d4e2faaaf8383edfc"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Reference to the counter value in the database
const counterRef = database.ref('counter');

// Function to update the counter value in the HTML
function updateCounter(value) {
    document.getElementById('counter').innerText = value;
}

// Function to increment the counter
function incrementCounter() {
    counterRef.transaction(currentValue => {
        return (currentValue || 0) + 1;
    });
}

// Listen for changes in the counter value in the database
counterRef.on('value', (snapshot) => {
    const counterValue = snapshot.val();
    updateCounter(counterValue);
});
