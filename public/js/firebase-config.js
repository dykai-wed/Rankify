// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEPLjHasTlOR4fExZFC5m3xQ7pOVxfkAs",
    authDomain: "rankify-b3fd7.firebaseapp.com",
    projectId: "rankify-b3fd7",
    storageBucket: "rankify-b3fd7.firebasestorage.app",
    messagingSenderId: "764209125909",
    appId: "1:764209125909:web:f7d4f2830021aa049d0c1c",
    measurementId: "G-BJZKBDYTNN"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Analytics
const analytics = firebase.analytics();

// Initialize Auth
const auth = firebase.auth();

// Enable offline persistence
db.enablePersistence()
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled in one tab at a time
            console.log('Persistence failed: Multiple tabs open');
        } else if (err.code === 'unimplemented') {
            // The current browser doesn't support persistence
            console.log('Persistence not available');
        }
    }); 