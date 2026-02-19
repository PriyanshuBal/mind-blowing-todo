from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# In-memory storage for todos
todos = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route('/api/todos', methods=['POST'])
def add_todo():
    data = request.json
    todo = {
        'id': len(todos) + 1,
        'text': data.get('text'),
        'completed': False
    }
    todos.append(todo)
    return jsonify(todo), 201

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    global todos
    todos = [t for t in todos if t['id'] != todo_id]
    return '', 204

@app.route('/api/todos/<int:todo_id>', methods=['PUT'])
def toggle_todo(todo_id):
    for todo in todos:
        if todo['id'] == todo_id:
            todo['completed'] = not todo['completed']
            return jsonify(todo)
    return jsonify({'error': 'Todo not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
