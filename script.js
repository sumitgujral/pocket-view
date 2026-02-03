// TMDB API Configuration
const API_KEY = 'YOUR_API_KEY_HERE'; // Users need to get their own free API key from TMDB
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const recommendedMovies = document.getElementById('recommendedMovies');
const searchMovies = document.getElementById('searchMovies');
const searchResults = document.getElementById('searchResults');
const recommendations = document.getElementById('recommendations');
const filterBtns = document.querySelectorAll('.filter-btn');

// State
let currentFilter = 'popular';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadRecommendedMovies('popular');
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.dataset.filter;
            if (filter === 'all') {
                loadRecommendedMovies('popular');
            } else {
                loadRecommendedMovies(filter);
            }
        });
    });
}

// Load recommended movies based on filter
async function loadRecommendedMovies(filter) {
    currentFilter = filter;
    showLoading(recommendedMovies);
    
    try {
        const endpoint = getEndpointForFilter(filter);
        const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        
        const data = await response.json();
        displayMovies(data.results, recommendedMovies);
        
        searchResults.classList.add('hidden');
        recommendations.classList.remove('hidden');
    } catch (error) {
        console.error('Error loading movies:', error);
        showError(recommendedMovies, 'Failed to load movies. Please check your API key.');
    }
}

// Handle search
async function handleSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        return;
    }
    
    showLoading(searchMovies);
    
    try {
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`
        );
        
        if (!response.ok) {
            throw new Error('Failed to search movies');
        }
        
        const data = await response.json();
        
        if (data.results.length === 0) {
            showError(searchMovies, `No movies found for "${query}"`);
        } else {
            displayMovies(data.results, searchMovies);
        }
        
        recommendations.classList.add('hidden');
        searchResults.classList.remove('hidden');
    } catch (error) {
        console.error('Error searching movies:', error);
        showError(searchMovies, 'Failed to search movies. Please check your API key.');
    }
}

// Get endpoint based on filter
function getEndpointForFilter(filter) {
    const endpoints = {
        popular: '/movie/popular',
        top_rated: '/movie/top_rated',
        upcoming: '/movie/upcoming',
        all: '/movie/popular'
    };
    
    return endpoints[filter] || endpoints.popular;
}

// Display movies in grid
function displayMovies(movies, container) {
    container.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        container.appendChild(movieCard);
    });
}

// Create movie card element
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    const posterPath = movie.poster_path 
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : null;
    
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    
    card.innerHTML = `
        ${posterPath 
            ? `<img src="${posterPath}" alt="${movie.title}" class="movie-poster" />`
            : `<div class="movie-poster no-poster">🎬</div>`
        }
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-meta">
                <span class="movie-rating">
                    <span class="rating-star">⭐</span>
                    <span>${rating}</span>
                </span>
                <span class="movie-year">${year}</span>
            </div>
        </div>
    `;
    
    // Add click event to show movie details (could be expanded)
    card.addEventListener('click', () => {
        showMovieDetails(movie);
    });
    
    return card;
}

// Show movie details (basic implementation)
function showMovieDetails(movie) {
    const overview = movie.overview || 'No overview available.';
    alert(`${movie.title}\n\n${overview}\n\nRating: ${movie.vote_average}/10`);
}

// Show loading state
function showLoading(container) {
    container.innerHTML = '<div class="loading">Loading movies...</div>';
}

// Show error message
function showError(container, message) {
    container.innerHTML = `<div class="loading">${message}</div>`;
}
