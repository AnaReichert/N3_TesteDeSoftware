from flask import Flask, request, jsonify
import json, os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
DATA_FILE = "data.json"

# Função para carregar dados
def load_data():
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w') as f:
            json.dump([], f)
    with open(DATA_FILE) as f:
        return json.load(f)

# Função para salvar dados
def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f)

@app.route('/cadastro', methods=['POST'])
def create():
    data = load_data()
    new_item = request.get_json()
    new_item["id"] = len(data) + 1
    data.append(new_item)
    save_data(data)
    return jsonify(new_item), 201

@app.route('/cadastro', methods=['GET'])
def read():
    return jsonify(load_data())

@app.route('/cadastro/<int:item_id>', methods=['PUT'])
def update(item_id):
    data = load_data()
    for item in data:
        if item['id'] == item_id:
            item.update(request.get_json())
            save_data(data)
            return jsonify(item)
    return jsonify({'error': 'Item not found'}), 404

@app.route('/cadastro/<int:item_id>', methods=['DELETE'])
def delete(item_id):
    data = load_data()
    new_data = [item for item in data if item['id'] != item_id]
    save_data(new_data)
    return jsonify({'message': 'Deleted'}), 200

if __name__ == '__main__':
    app.run(debug=True)
