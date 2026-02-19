document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // Load todos
    fetchTodos();

    // Add Todo
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    async function fetchTodos() {
        const res = await fetch('/api/todos');
        const todos = await res.json();
        todoList.innerHTML = '';
        todos.forEach(renderTodo);
    }

    async function addTodo() {
        const text = todoInput.value.trim();
        if (!text) return;

        const res = await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        if (res.ok) {
            const todo = await res.json();
            renderTodo(todo);
            todoInput.value = '';
        }
    }

    async function renderTodo(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;
        
        li.innerHTML = `
            <div class="todo-content">
                <div class="custom-checkbox">
                    <i class="fas fa-check"></i>
                </div>
                <span>${escapeHtml(todo.text)}</span>
            </div>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;

        // Toggle Complete
        li.querySelector('.todo-content').addEventListener('click', () => toggleTodo(todo.id, li));

        // Delete Todo
        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTodo(todo.id, li);
        });

        todoList.appendChild(li);
    }

    async function toggleTodo(id, li) {
        const res = await fetch(`/api/todos/${id}`, { method: 'PUT' });
        if (res.ok) {
            li.classList.toggle('completed');
        }
    }

    async function deleteTodo(id, li) {
        const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
        if (res.ok) {
            li.style.animation = 'fadeOut 0.3s ease-in forwards';
            li.addEventListener('animationend', () => li.remove());
        }
    }

    // Helper to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.innerText = text;
        return div.innerHTML;
    }
});
