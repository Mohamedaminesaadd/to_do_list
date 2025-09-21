document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-task').addEventListener('click', addTaskFromInput);
    loadtasks();
});

function addTaskFromInput() {
    const taskValue = document.getElementById('new-task').value.trim();
    if (taskValue) {
        addTask(taskValue);
        document.getElementById('new-task').value = '';
        saveTask();
    }
}

function addTask(taskValue, isCompleted = false) {
    const ul = document.getElementById('task-list');
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', toggleTask);

    const text = document.createElement('span');
    text.textContent = taskValue;
    text.style.textDecoration = isCompleted ? 'line-through' : 'none';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', editTask);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    ul.appendChild(li);
}

function saveTask() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(function(taskLi) {
        const text = taskLi.querySelector('span').textContent;
        const isCompleted = taskLi.querySelector('input').checked;
        tasks.push({ text: text, isCompleted: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadtasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        addTask(task.text, task.isCompleted);
    });
}

function toggleTask(event) {
    const text = event.target.nextElementSibling;
    text.style.textDecoration = event.target.checked ? 'line-through' : 'none';
    saveTask();
}

function editTask(event) {
    const textSpan = event.target.previousElementSibling;
    const newText = prompt('Edit task:', textSpan.textContent);
    if (newText !== null) {
        textSpan.textContent = newText;
        saveTask();
    }
}

function deleteTask(event) {
    const li = event.target.parentElement;
    li.remove();
    saveTask();
}
