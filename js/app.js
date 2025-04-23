// Global variables
let currentCategory = 'restaurants';
let currentCity = 'Your City';
let map;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Google Maps
    initMap();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadRankings();
    
    // Track page view
    analytics.logEvent('page_view');
});

// Initialize Google Maps
function initMap() {
    // Default center (you can change this to your city's coordinates)
    const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // New York City coordinates

    const mapOptions = {
        center: defaultCenter,
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ]
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

// Set up event listeners
function setupEventListeners() {
    // Category filter change
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        currentCategory = e.target.value;
        loadRankings();
    });
}

// Load rankings from Firestore
function loadRankings() {
    const rankingsList = document.getElementById('rankingsList');
    rankingsList.innerHTML = ''; // Clear existing content

    db.collection('rankings')
        .where('category', '==', currentCategory)
        .orderBy('score', 'desc')
        .limit(10)
        .onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                const data = doc.data();
                const card = createRankingCard(doc.id, data);
                rankingsList.appendChild(card);
            });
        });
}

// Create a ranking card element
function createRankingCard(id, data) {
    const col = document.createElement('div');
    col.className = 'col-md-6';
    
    col.innerHTML = `
        <div class="card ranking-card">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.description}</p>
                <div class="rating-stars">
                    ${createStarRating(data.rating)}
                </div>
                <button class="btn btn-primary mt-2" onclick="submitRating('${id}', 5)">
                    Rate this place
                </button>
            </div>
        </div>
    `;
    
    return col;
}

// Create star rating HTML
function createStarRating(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(i <= rating ? '★' : '☆');
    }
    return stars.join('');
}

// Submit a rating
function submitRating(placeId, rating) {
    if (!auth.currentUser) {
        alert('Please sign in to rate places');
        return;
    }

    db.collection('ratings').add({
        placeId,
        rating,
        userId: auth.currentUser.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        analytics.logEvent('rating_submitted', {
            place_id: placeId,
            rating: rating
        });
    }).catch((error) => {
        console.error('Error submitting rating:', error);
        alert('Error submitting rating. Please try again.');
    });
}

// Update map markers
function updateMapMarkers(rankings) {
    // Clear existing markers
    if (window.markers) {
        window.markers.forEach(marker => marker.setMap(null));
    }
    window.markers = [];

    // Add new markers
    rankings.forEach(ranking => {
        const marker = new google.maps.Marker({
            position: { lat: ranking.lat, lng: ranking.lng },
            map: map,
            title: ranking.name
        });
        window.markers.push(marker);
    });
} 