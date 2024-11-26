from flask import Flask, render_template, request, jsonify
from logic import process_name

app = Flask(__name__)

# Home route to render HTML page
@app.route('/')
def home():
    return render_template('index.html')

# API route to process data using logic.py
@app.route('/api/process', methods=['POST'])
def process_data():
    data = request.json
    name = data.get('name', 'Guest')
    
    # Use the function from logic.py
    result = process_name(name)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
