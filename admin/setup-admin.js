// This script helps you set up the initial admin user
// Run this in the browser console after setting up Firebase Authentication

function setupAdminUser(email, password) {
    // Create the user
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // Add user to admins collection
            return db.collection('admins').doc(user.uid).set({
                email: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            console.log('Admin user created successfully');
            alert('Admin user created successfully');
        })
        .catch((error) => {
            console.error('Error creating admin user:', error);
            alert('Error creating admin user: ' + error.message);
        });
}

// Usage:
// 1. Open the browser console
// 2. Run: setupAdminUser('your-email@example.com', 'your-password') 