# How to Create a Flask Web App from Scratch

by Weizhi Du and Zhengyuhan Yan

</br>

This project demonstrates how to create a basic Flask web application with an HTML/CSS frontend and Python backend. This guide demonstrates how to build a web application using Flask with the different front-end approach:

- HTML/CSS and Python

---

## Prerequisites

Before you start, ensure you have the following installed:
- Python (3.7 or later)
- pip (Python package installer)


## Step 1: Install Flask

Run the following command in your terminal:

```
pip install flask
```

For reproductivity, it is recommended to Add Flask to your requirements.txt:

```
flask
```

Install with:

```
pip install -r requirements.txt
```

## Step 2: Run the Application

1. Clone the repository or copy the files into a folder.
```
git clone https://github.com/Weizhi-Du/intro-to-flask-guide.git
```

2. Navigate to the folder in your terminal.
```
cd intro-to-flask-guide
```

3. Please read the flask project structure below. We have created an HTML template in `templates/index.html` serving as the frontend and added CSS styling to `static/css/styles.css`. We also implemented the backend logic in `logic.py` to be served by the Flask Application.
```
intro-to-flask-guide/
│
├── app.py           # Flask application
├── logic.py         # Contains backend logic
├── templates/
│   └── index.html   # HTML frontend
├── static/
│   └── css/
│       └── styles.css # CSS styling
│── requirements.txt # Required packages
└── README.md        # Documentation
```

# Step 3: Implement the Flask Backend

The `app.py` file serves as the entry point for the Flask web application, handling routing and API interactions. It is recommended to create a new file and try to implement the backend with this guide on yourself. Here's a detailed explanation how to get started:

1. We first need to import the `process_name` function from the `logic.py` file.
```
from logic import process_name
```
This modularizes the application by separating backend logic from routing and server code.

2. In order to initialize the Flask modules, we will import necessary Flask modules explained below, and then initialize the application.
```
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
```
- `Flask`: The core Flask application class for creating a web app.
- `render_template`: Used to render HTML templates located in the `templates/` folder.
- `request`: Allows accessing HTTP request data (e.g., JSON payloads, form inputs).
- `jsonify`: Converts Python dictionaries into JSON responses for API interactions.

3. We will create routes that map the URL paths to specific functions in the backend.
```
@app.route('/')
def home():
    return render_template('index.html')
```
- `@app.route('/')`: Define a route for the homepage (/).
- `def home():`: Define the home function, which is triggered when the user accesses the / route.
- `return render_template('index.html')`: Render and return the index.html file located in the templates/ folder. This serves as the main frontend for the app.

4. We then define the route that handles data sent from the frontend for processing in the backend.
```
@app.route('/api/process', methods=['POST'])
def process_data():
    data = request.json
    name = data.get('name', 'Guest')
    result = process_name(name)
    return jsonify(result)
```
