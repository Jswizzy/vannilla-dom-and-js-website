const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

console.log('hello there');

loadEventListeners();

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function clearTasks() {
    taskList.innerHTML = '';
    clearTasksFromLocalStorage();
}

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', showTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks)
    filter.addEventListener('keyup', filterTasks)
}

function showTasks() {
    const tasks = getTasks();
    tasks.forEach(task => {
        showTask(task);
    });
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(node => {
        const item = node.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            node.style.display = 'block';
        } else {
            node.style.display = 'none';
        }
    });
}

function storeTaskLocally(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showTask(task) {
    const li = document.createElement('li');
    li.className = 'collection-item';

    li.appendChild(document.createTextNode(task));

    const link = document.createElement(('a'));
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="material-icons">close</i>';

    li.appendChild(link);
    taskList.appendChild(li);
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    } else {
        const task = taskInput.value;

        showTask(task);

        taskInput.value = '';

        storeTaskLocally(task);
    }
    e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks = getTasks();
    tasks.forEach( (task, index) => {
        if (taskItem === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            const item = e.target.parentElement.parentElement;
            const text = item.textContent.slice(0, -5);
            item.remove();
            removeTaskFromLocalStorage(text);
        }
    }
    e.preventDefault();
}