1. Project Structure
Create a new folder (or clean up your existing one) to look like this:

Plaintext
PocketView/
│
├── api.py              # (Keep your existing file as is)
├── app.py              # REPLACES main.py (The Flask Server)
├── static/
│   └── script.js       # For Dark Mode toggle logic
└── templates/
    ├── base.html       # Master layout (Tailwind CDN & Navbar)
    ├── index.html      # Home Page (Search & Grid)
    └── details.html    # Movie Details Page