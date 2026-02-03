# app.py
from flask import Flask, render_template, request, redirect, url_for
from api import get_data, IMG_URL
import urllib.parse

app = Flask(__name__)

# --- HELPER: Smart Links ---
def get_direct_link(provider_name, movie_title):
    title_encoded = urllib.parse.quote(movie_title)
    p_lower = provider_name.lower()
    
    if "netflix" in p_lower:
        return f"https://www.netflix.com/search?q={title_encoded}"
    elif "amazon" in p_lower or "prime" in p_lower:
        return f"https://www.primevideo.com/search/ref=atv_sr_sug_atv_sr_hom_ss_2_5?phrase={title_encoded}"
    elif "hotstar" in p_lower or "disney" in p_lower:
        return f"https://www.hotstar.com/in/search?search_query={title_encoded}"
    elif "jio" in p_lower:
        return f"https://www.jiocinema.com/search/{title_encoded}"
    elif "youtube" in p_lower:
        return f"https://www.youtube.com/results?search_query={title_encoded}+movie"
    elif "apple" in p_lower:
        return f"https://tv.apple.com/search?term={title_encoded}"
    
    return f"https://www.google.com/search?q=watch+{title_encoded}+on+{provider_name}"

app.jinja_env.globals.update(get_direct_link=get_direct_link)
app.jinja_env.globals.update(quote=urllib.parse.quote)

@app.route('/')
def index():
    query = request.args.get('query')
    country = 'IN' 
    results = []
    page_title = "Trending Now"

    if query:
        data = get_data("search/movie", f"query={query}")
        if data: results = data.get('results', [])
        page_title = f"Results for '{query}'"
    else:
        data = get_data("movie/now_playing", f"region={country}")
        if data: results = data.get('results', [])[:5]

    return render_template('index.html', results=results, img_url=IMG_URL, title=page_title)

@app.route('/movie/<int:movie_id>')
def details(movie_id):
    country = 'IN'
    
    # 1. FETCH EXTRA DATA: videos, reviews
    details = get_data(f"movie/{movie_id}", "append_to_response=credits,recommendations,watch/providers,videos,reviews")
    
    if not details:
        return redirect(url_for('index'))

    cast = details.get('credits', {}).get('cast', [])[:6]
    recs = details.get('recommendations', {}).get('results', [])[:5]
    providers = details.get('watch/providers', {}).get('results', {}).get(country, {}).get('flatrate', [])
    
    # 2. LOGIC: Find the YouTube Trailer
    videos = details.get('videos', {}).get('results', [])
    trailer = next((v for v in videos if v['site'] == 'YouTube' and v['type'] == 'Trailer'), None)
    
    # 3. LOGIC: Get top 2 Reviews
    reviews = details.get('reviews', {}).get('results', [])[:6]

    # 4. LOGIC: DIRECTOR 
    crew = details.get('credits', {}).get('crew', [])
    # Find the first person with job 'Director'
    director = next((member['name'] for member in crew if member['job'] == 'Director'), "Unknown")

    return render_template('details.html', movie=details, cast=cast, recs=recs, providers=providers, trailer=trailer, reviews=reviews, director=director, img_url=IMG_URL)

if __name__ == '__main__':
    app.run(debug=True)