//get all element from ui
const form = document.querySelector('#formTasks');
const input = document.querySelector('#task-input');
const filter = document.querySelector('#filter');
const list = document.querySelector('.collection');
const clearaAll = document.querySelector('.clearTasks');

//function hold all event listeners
addEventListeners();

function addEventListeners(){
    document.addEventListener('DOMContentLoaded',getTasks);
    form.addEventListener('submit',addTask);
    list.addEventListener('click',removeTask);
    clearaAll.addEventListener('click', removeAll);
    filter.addEventListener('keyup',searchtask)
}

//function to add input to taskList
function addTask(e){
    
    if(input.value === ''){
        alert('please enter a vaild input');
    }
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(input.value));
    const link = document.createElement('a');
    link.className = 'deleteItem secondary-content';
    link.innerHTML ='<i class="fas fa-minus-circle"></i>';
    li.appendChild(link);
    list.appendChild(li);
    storeinlocalstorage(input.value);
    input.value ='';
    e.preventDefault()

}

//function to store items in local storage
function storeinlocalstorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//dislay saved tasks from localstorage to ui
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks')=== null){
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'deleteItem secondary-content';
        link.innerHTML ='<i class="fas fa-minus-circle"></i>';
        li.appendChild(link);
        list.appendChild(li);
    })
}

//to remove tasks 
function removeTask(e){
    if(e.target.parentElement.classList.contains('deleteItem')){
        e.target.parentElement.parentElement.remove();
        removeTasksFromLocalStorage(e.target.parentElement.parentElement);
    }
}

//romve fromlocal storage
function removeTasksFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task , index){
        if(taskItem.textContent === task){
            tasks.splice(index , 1);
        }
        localStorage.setItem('tasks',JSON.stringify(tasks));
    })

}

//to remove all taasks
function removeAll(e){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
    removealltasksfromlocalstorage();
}

//to remove all tasks from locastorage
function removealltasksfromlocalstorage(){
    localStorage.clear();
}

//search task
function searchtask(e){
    const text = e.target.value.toLowerCase();
    const tasks = document.querySelectorAll('li');
    tasks.forEach(function(task){
        if(task.firstChild.textContent.toLowerCase().indexOf(text) !== -1){
            task.style.display ='block';
        }
        else{
            task.style.display ='none';
        }
    })
}