// Check authentication state
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Check if user is an admin
    checkAdminStatus(user.uid);
});

// Check if user has admin privileges
function checkAdminStatus(uid) {
    db.collection('admins').doc(uid).get()
        .then((doc) => {
            if (!doc.exists) {
                // User is not an admin
                alert('You do not have admin privileges');
                auth.signOut();
                window.location.href = 'login.html';
                return;
            }
            
            // User is an admin, proceed with loading data
            loadRankings();
            setupFormSubmission();
            updateUserInfo();
        })
        .catch((error) => {
            console.error('Error checking admin status:', error);
            alert('Error verifying admin status');
            window.location.href = 'login.html';
        });
}

// Update user info in the UI
function updateUserInfo() {
    const user = auth.currentUser;
    if (user) {
        const userEmail = document.createElement('span');
        userEmail.className = 'nav-link';
        userEmail.textContent = user.email;
        
        const nav = document.querySelector('.navbar-nav');
        nav.appendChild(userEmail);
    }
}

// Set up form submission
function setupFormSubmission() {
    document.getElementById('addRankingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const rankingData = {
            name: document.getElementById('name').value,
            category: document.getElementById('category').value,
            description: document.getElementById('description').value,
            lat: parseFloat(document.getElementById('lat').value),
            lng: parseFloat(document.getElementById('lng').value),
            score: parseFloat(document.getElementById('score').value),
            rating: 0,
            totalRatings: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        addRanking(rankingData);
    });
}

// Add new ranking
function addRanking(data) {
    db.collection('rankings').add(data)
        .then((docRef) => {
            console.log('Ranking added with ID:', docRef.id);
            document.getElementById('addRankingForm').reset();
            loadRankings();
        })
        .catch((error) => {
            console.error('Error adding ranking:', error);
            alert('Error adding ranking. Please try again.');
        });
}

// Load rankings
function loadRankings() {
    const rankingsList = document.getElementById('rankingsList');
    rankingsList.innerHTML = ''; // Clear existing content

    db.collection('rankings')
        .orderBy('score', 'desc')
        .onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                const data = doc.data();
                const card = createRankingCard(doc.id, data);
                rankingsList.appendChild(card);
            });
        });
}

// Create ranking card for admin panel
function createRankingCard(id, data) {
    const div = document.createElement('div');
    div.className = 'card mb-3';
    
    div.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">${data.description}</p>
            <p class="card-text">
                <small class="text-muted">
                    Category: ${data.category} | Score: ${data.score} | 
                    Rating: ${data.rating.toFixed(1)} (${data.totalRatings} ratings)
                </small>
            </p>
            <div class="btn-group">
                <button class="btn btn-sm btn-primary" onclick="editRanking('${id}')">
                    Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteRanking('${id}')">
                    Delete
                </button>
            </div>
        </div>
    `;
    
    return div;
}

// Edit ranking
function editRanking(id) {
    // Implement edit functionality
    // This could be done by showing a modal with the current data
    // and allowing the user to update it
    alert('Edit functionality to be implemented');
}

// Delete ranking
function deleteRanking(id) {
    if (confirm('Are you sure you want to delete this ranking?')) {
        db.collection('rankings').doc(id).delete()
            .then(() => {
                console.log('Ranking deleted');
                loadRankings();
            })
            .catch((error) => {
                console.error('Error deleting ranking:', error);
                alert('Error deleting ranking. Please try again.');
            });
    }
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
}); 