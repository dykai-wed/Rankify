# Rankify - Localized Ranking Tool

A simple web application for ranking and discovering local places in your city. Built with Bootstrap 5, Firebase, and Google Maps.

## Features

- View top 10 places in different categories
- Filter by category and tags
- Interactive Google Maps integration
- User rating system
- Admin panel for managing rankings
- Real-time updates using Firebase
- Responsive design with Bootstrap 5

## Prerequisites

- Node.js and npm installed
- Firebase account and project
- Google Maps API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rankify.git
cd rankify
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a new Firebase project
   - Enable Firestore Database
   - Enable Authentication
   - Get your Firebase configuration
   - Update `public/js/firebase-config.js` with your Firebase credentials

4. Configure Google Maps:
   - Get a Google Maps API key
   - Add the Maps JavaScript API to your project
   - Update the Maps initialization in `public/js/app.js`

5. Start the development server:
```bash
npm start
```

## Project Structure

```
/public
  index.html           # Homepage with rankings
  /css
    custom.css         # Bootstrap overrides
  /js
    firebase-config.js # Firebase initialization
    app.js            # Main application logic
/admin
  edit-rankings.html   # Admin panel for managing rankings
  admin.js            # Admin panel logic
```

## Firebase Collections

### rankings
- name: string
- category: string
- description: string
- lat: number
- lng: number
- score: number
- rating: number
- totalRatings: number
- createdAt: timestamp
- updatedAt: timestamp

### ratings
- placeId: string
- rating: number
- userId: string
- timestamp: timestamp

## Deployment

1. Deploy to Vercel:
   - Connect your GitHub repository to Vercel
   - Configure build settings
   - Deploy

2. Deploy to Firebase (fallback):
   ```bash
   firebase deploy
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 