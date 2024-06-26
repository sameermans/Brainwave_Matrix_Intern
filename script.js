document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const categorySelect = document.getElementById('todo-category');
    const dateInput = document.getElementById('todo-date');
    const todoList = document.getElementById('todo-list');
    const filterButtons = document.getElementById('todo-filters').children;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks(filteredTasks = tasks) {
        todoList.innerHTML = '';
        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            if (task.completed) li.classList.add('completed');
            li.innerHTML = `
                <div class="task-content">
                    <span class="category ${task.category}">${task.category}</span>
                    <span class="task-text">${task.text}</span>
                    <span class="due-date">${task.dueDate}</span>
                </div>
                <div class="task-actions">
                    <button class="toggle-btn" data-index="${index}"><i class="fas fa-check"></i></button>
                    <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        const category = categorySelect.value;
        const dueDate = dateInput.value;
        if (text) {
            tasks.push({ text, category, dueDate, completed: false });
            saveTasks();
            renderTasks();
            input.value = '';
            dateInput.value = '';
        }
    });

    todoList.addEventListener('click', (e) => {
        const index = e.target.closest('button').getAttribute('data-index');
        if (e.target.closest('.delete-btn')) {
            tasks.splice(index, 1);
        } else if (e.target.closest('.toggle-btn')) {
            tasks[index].completed = !tasks[index].completed;
        } else if (e.target.closest('.edit-btn')) {
            const newText = prompt('Edit task:', tasks[index].text);
            if (newText !== null) tasks[index].text = newText.trim();
        }
        saveTasks();
        renderTasks();
    });

    Array.from(filterButtons).forEach(button => {
        button.addEventListener('click', (e) => {
            Array.from(filterButtons).forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            let filteredTasks;
            if (e.target.id === 'filter-active') {
                filteredTasks = tasks.filter(task => !task.completed);
            } else if (e.target.id === 'filter-completed') {
                filteredTasks = tasks.filter(task => task.completed);
            } else {
                filteredTasks = tasks;
            }
            renderTasks(filteredTasks);
        });
    });

    renderTasks();
});