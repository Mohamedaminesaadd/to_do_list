document.addEventListener('DOMContentLoaded', fonction () {
    document.getElementById('new-task').addEventListener('click',addTaskFromInput);
    loadtasks();
});

function addTaskFromInput(){
    const taskValue = document.getElementById('new-task').value;
    if(taskValue){
        addTask(taskValue);
        document.getElementById('new-task').value='';
        saveTask();

    }
}

function addTask(taskValue , isCompleted =false){
    const ul = document.getElementById('task-list');
    const li = document.createElement('li');

    const 
}