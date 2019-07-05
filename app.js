const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

console.log('hello there');

loadEventListeners();

function clearTasks() {
    taskList.innerHTML = '';
}

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks)
    filter.addEventListener('keyup', filterTasks)
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(node => {
        const item = node.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !== -1) {
            node.style.display = 'block';
        } else {
            node.style.display = 'none';
        }
    });
}

function storeTaskLocally(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    } else {
        const li = document.createElement('li');
        li.className = 'collection-item';

        const task = taskInput.value;

        li.appendChild(document.createTextNode(task));

        const link = document.createElement(('a'));
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="material-icons">close</i>';

        li.appendChild(link);
        taskList.appendChild(li);

        storeTaskLocally(task);

        taskInput.value = '';
    }
    e.preventDefault();
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }

    e.preventDefault();
}