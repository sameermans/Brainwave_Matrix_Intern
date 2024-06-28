document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const categorySelect = document.getElementById('todo-category');
    const dateInput = document.getElementById('todo-date');
    const timeInput = document.getElementById('todo-time');
    const todoList = document.getElementById('todo-list');
    const filterButtons = document.getElementById('todo-filters').children;
    const tasksCount = document.getElementById('tasks-count');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const themeToggle = document.getElementById('theme-toggle');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateTasksCount();
    }

    function updateTasksCount() {
        const activeTasks = tasks.filter(task => !task.completed).length;
        tasksCount.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} remaining`;
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
                    <span class="due-date">${task.dueDate} ${task.dueTime}</span>
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
        const dueTime = timeInput.value;
        if (text) {
            tasks.push({ text, category, dueDate, dueTime, completed: false });
            saveTasks();
            renderTasks();
            input.value = '';
            dateInput.value = '';
            timeInput.value = '';
        }
    });

    todoList.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        const index = button.getAttribute('data-index');
        if (button.classList.contains('delete-btn')) {
            tasks.splice(index, 1);
        } else if (button.classList.contains('toggle-btn')) {
            tasks[index].completed = !tasks[index].completed;
        } else if (button.classList.contains('edit-btn')) {
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

    clearCompletedBtn.addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    renderTasks();
    updateTasksCount();
});