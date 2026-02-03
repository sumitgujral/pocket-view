# 🎬 Pocket View

A modern, responsive movie search and recommendation web application that helps you discover movies using The Movie Database (TMDB) API.

## Features

- **Movie Search**: Search for any movie by title
- **Recommendations**: Browse popular, top-rated, and upcoming movies
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Movie Details**: View ratings, release year, and overview for each movie
- **Beautiful UI**: Modern gradient design with smooth animations

## Setup Instructions

### 1. Get a TMDB API Key

1. Visit [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API → Request an API Key
4. Choose "Developer" option
5. Fill in the required information
6. Copy your API Key (v3 auth)

### 2. Configure the Application

1. Open `script.js` in a text editor
2. Replace `'YOUR_API_KEY_HERE'` with your actual TMDB API key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```
3. Save the file

### 3. Run the Application

Simply open `index.html` in your web browser. No server or build process required!

**Options to run:**
- Double-click `index.html` to open in your default browser
- Right-click `index.html` → Open with → Choose your browser
- Use a local development server (optional):
  ```bash
  # Using Python
  python -m http.server 8000
  
  # Using Node.js
  npx http-server
  ```
  Then visit `http://localhost:8000`

## Usage

1. **Search Movies**: Type a movie name in the search bar and click "Search" or press Enter
2. **Browse Recommendations**: Click on filter buttons (Popular, Top Rated, Upcoming) to see different movie categories
3. **View Details**: Click on any movie card to see more information

## Technologies Used

- **HTML5**: Structure and semantics
- **CSS3**: Styling with gradients, flexbox, and grid
- **Vanilla JavaScript**: API integration and interactivity
- **TMDB API**: Movie data and posters

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Project Structure

```
pocket-view/
├── index.html      # Main HTML file
├── style.css       # Stylesheet
├── script.js       # JavaScript functionality
├── .gitignore      # Git ignore file
└── README.md       # This file
```

## API Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)

## License

This project is open source and available for educational purposes.
