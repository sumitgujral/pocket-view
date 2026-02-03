import requests
from functools import lru_cache
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import os
from dotenv import load_dotenv
load_dotenv()

# Your Config
API_KEY = os.getenv("API_KEY")
BASE_URL = "https://api.themoviedb.org/3"
IMG_URL = "https://image.tmdb.org/t/p/w500"

# Robust Session Setup
def get_session():
    session = requests.Session()
    retry = Retry(connect=3, backoff_factor=0.5)
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    return session

@lru_cache(maxsize=128)
def get_data(endpoint, params=""):
    url = f"{BASE_URL}/{endpoint}?api_key={API_KEY}&{params}"
    
    # mimic a real browser to avoid being blocked
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json",
        "Referer": "https://www.google.com/"
    }

    try:
        session = get_session()
        # Increased timeout to 10 seconds
        response = session.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 404:
            print(f"Not Found: {url}")
            return None
        else:
            print(f"Error {response.status_code}: {url}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"Network Error: {e}")
        return None