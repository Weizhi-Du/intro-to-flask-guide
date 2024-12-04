# How to Create a Flask Web App from Scratch

by Weizhi Du and Zhengyuhan Yan

</br>

This guide demonstrates how to build a web application using Flask with the different front-end approach:

- HTML/CSS and Python
- React and Python

---

## Prerequisites

Before you start, ensure you have the following installed:
- Python (3.9 or later)
- pip (Python package installer)
- Node.js (for React frontend)



## Step 1: Clone the repository

> 📚 How to fork a repository? Read this [GitHub documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).

1. To get started, please fork this GitHub repository:
```
https://github.com/Weizhi-Du/intro-to-flask-guide/
```

2. Clone it to your code editor (e.g. VS Code). The repository contains the necessary files for the Flask backend and the frontend.
```
git clone https://github.com/[YOUR-GITHUB-USERNAME]/intro-to-flask-guide.git
```

3. Navigate to the folder containing the project files.
```
cd intro-to-flask-guide
```

4. Please read the flask project structure below. We have created an HTML template in `templates/index.html` serving as the frontend and added CSS styling to `static/css/styles.css`. We also implemented the backend logic in `logic.py` to be served by the Flask Application.
```
intro-to-flask-guide/
│
├── app.py              # Flask application
├── logic.py            # Backend logic for processing data
├── templates/
│   └── index.html      # HTML frontend
├── static/
│   └── css/
│       └── styles.css  # CSS styling for HTML frontend
├── react/
│   └── App.css/        # CSS styling for React frontend
│   └── App.js/         # Javascript for React frontend
│── requirements.txt    # Required packages
│── .gitignore          # Files to be ignored by version control
└── README.md           # Documentation
```


## Step 2: Install Flask

(Optional) Creating virtual environments in Python helps isolate project dependencies, ensuring that each project has its own specific package versions without conflicts. Let's create a virtual environment for your project:
```
python3 -m venv .venv
source env/bin/activate
```

Run the following command in your terminal:

```
pip install flask
```

(Optional) For reproductivity, it is recommended to add Flask to your requirements.txt:

```
flask
```

(Optional) Install with:

```
pip install -r requirements.txt
```


## Step 3: Implement the Flask Backend

The `app.py` file serves as the entry point for the Flask web application, handling routing and API interactions. It is recommended to create a new file and try to implement the backend with this guide yourself. Here's a detailed explanation of how to get started:

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
- `@app.route('/api/process', methods=['POST'])`: Define a route for the /api/process endpoint, specifying that it accepts only POST requests (similar to the previous part).
- `data = request.json`: Extract the JSON payload sent with the POST request and store it in the data variable.
- `name = data.get('name', 'Guest')`: Retrieve the name value from the data dictionary. If no name key exists, default to `'Guest'`.
- `result = process_name(name)`: Call the `process_name` function (imported from `logic.py`), passing the name as an argument. This function performs the main processing logic and returns a dictionary with the results.
- `return jsonify(result)`: Convert the result dictionary into a JSON response and send it back to the frontend.

5. Start the Flask development server with the debug mode enabled.
```
if __name__ == '__main__':
    app.run(debug=True)
```

Now at this point, you should have your Flask backend implemented. Let's run the app locally!

## Step 4: Run the Flask App

Run the script to test your Flask application:
```
python app.py
```
The app will be accessible at `http://127.0.0.1:5000/`.

Amazing! You just launched your first flask app. If you would like to learn something more and make your web application more powerful (and possibly another framework for your [CSE330 Creative Project](https://classes.engineering.wustl.edu/cse330/index.php?title=Module_7)), let's create a full-stack web application using **React** for the frontend and **Flask** for the backend.

Assume that you have been through steps 1-4, and you may use `Control + C` to stop your application and get ready to modify your frontend and backend.

## Step 5: Enable CORS in Flask

> 📚 The [**Flask-CORS**](https://flask-cors.readthedocs.io/en/stable/) library is an extension for Flask that allows handling Cross-Origin Resource Sharing (CORS). CORS is a mechanism that permits a web application running on one domain (frontend) to access resources from a server hosted on another domain (backend). This is crucial in a React and Flask setup because they often operate on different domains during development (e.g. React on `localhost:3000` and Flask on `localhost:5000`).

Flask's default configuration does not allow requests from different origins (domains/ports). To fix this, we can use the `flask-cors` library:

Install flask-cors:
```
pip install flask-cors
```

(Optional) For reproductivity, it is recommended to add flask-cors to your requirements.txt:

```
flask-cors
```

(Optional) Install with:

```
pip install -r requirements.txt
```

Then, you may import and use CORS to enable cross-origin requests in `app.py`:
```
from flask_cors import CORS
```
Also allow your Flask backend to handle requests from any origin, including the React frontend (running on `localhost:3000`):
```
CORS(app)
```
Remember to comment out the home route that renders the HTML template we did earlier:
```
# @app.route('/')
# def home():
#     return render_template('index.html')
```

## Step 6: Setup the React Frontend

> 📚 [**React**](https://react.dev/learn) is a JavaScript library for building dynamic, interactive user interfaces. Unlike plain HTML/CSS, React allows developers to create reusable components and manage the application's state efficiently, making it easier to build. React also uses a virtual DOM to update only the parts of the UI that change, resulting in faster performance compared to manually updating the DOM with plain HTML/CSS.

Make sure that [Node.js](https://classes.engineering.wustl.edu/cse330/index.php?title=Node.JS) has been installed on your end (you should have it after finishing [*Module 6: Real-Time Web Applications*](https://classes.engineering.wustl.edu/cse330/index.php?title=Module_6) in CSE330).

We create a React app:
```
npx create-react-app frontend
```

A simple example of the frontend Javascript and CSS code has been provided in the folder `/react`. You may copy the files to `/frontend/src` to replace the existing `App.js` and `App.css` files. Make sure that you read these files thoroughly and understand their logic. You may change the files to create your own frontend!

You may use your file manager (e.g. Finder, File Explorer) or code editor (VS Code) to replace these files. Alternatively, you can do so by using the command:
```
mv ./react/App.js ./react/App.css ./frontend/src/
```

Navigate to the `frontend` folder and start the app:
```
cd frontend
npm start
```

It may throw an error if you have not installed `axios`, which will be covered in **Step 7**.

After you have installed `axios` and started the React frontend, the frontend will be hosted on `http://127.0.0.1:3000`.

## Step 7: Connect the Frontend and Backend

> 📚 [**Axios**](https://axios-http.com/docs/intro) is a JavaScript library used in React for making HTTP requests to APIs. It simplifies the process of sending GET, POST, PUT, and DELETE requests. When implementing a React frontend with a Flask backend, Axios is typically used to communicate between the two, enabling React to send requests to Flask APIs and receive responses efficiently.

We need to ensure that Axios is correctly set up in your React app to communicate with the Flask backend:
```
npm install axios
```

In `App.js`, we have updated the POST request URL to point to the Flask backend:
```
const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const res = await axios.post("http://127.0.0.1:5000/api/process", { name });
        setResponse(res.data);
    } catch (error) {
        console.error("Error:", error);
    }
};
```

For the backend, you should have configured `flask-cors` to handle requests from your React frontend in **Step 5**.

Finally, let's test it out! We start the Flask backend and the React frontend:
```
python app.py
```
```
npm start
```
The application will be hosted on `http://127.0.0.1:3000`.

The React app should send a POST request to the Flask backend and display the processed result.

## Optional: Use a Proxy for Local Development

If you prefer not to deal with CORS during development, configure a proxy in React:

1. Add a Proxy to `package.json`:
```
"proxy": "http://127.0.0.1:5000"
```
This tells React to forward API requests to the Flask backend automatically.

2. Remove the base URL in the request in `App.js`, as React's proxy handles it:
```
const res = await axios.post("/api/process", { name });
```
3. Start the server:
```
npm start
```


## Summary

This project demonstrates:

- How React and Flask can work together to build a full-stack web app.
- React handles the frontend for interactive user experiences.
- Flask handles the backend for data processing and API support.

Feel free to customize the logic in `logic.py` or extend the frontend for additional features. When deploying the app, ensure both the React frontend and Flask backend are hosted on the same domain to avoid CORS issues. You can also serve the React app directly from the Flask backend in production.

Good job! You have completed this tutorial:)

## Resources

[Flask Documentation](https://flask.palletsprojects.com/en/stable/) | [Python Documentation](https://docs.python.org/3/) | [React Documentation](https://react.dev/learn)

[Flask-CORS Documentation](https://flask-cors.readthedocs.io/en/stable/) | [Axios Documentation](https://axios-http.com/docs/intro)
