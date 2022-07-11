const forms = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskinput = document.querySelector('#task');

//function to load all event listeners
loadeventlisteners();
function loadeventlisteners(){
    //add task forms
    forms.addEventListener('submit', addtask);
    
    //remove task event
    tasklist.addEventListener('click', removetask);

    //clear task event button
    clearbtn.addEventListener('click', cleartask);

    //filtering through the tasks
    filter.addEventListener('keyup', filtertasks);

    document.addEventListener('DOMContentLoaded', gettasks);
}

//get the tasks from local storage (NOT WORKING)
function gettasks(){
    let tasks;
    if(localStorage.getItem('tasks') ===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //create a new list element
        const li = document.createElement('li');
        
        //adding a class to it
        li.className = 'collection-item';
        
        //creating the text node and appending it to the list element
        li.appendChild(document.createTextNode(task));
        
        //a new link for the list element is created
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        //another child element of the link
        link.innerHTML = '<i class = "fa fa-remove"> </i>';
        li.appendChild(link);
        tasklist.appendChild(li);
    })
}

function addtask(e){
    if(taskinput.value === ''){
        alert('add a task');
    }

    //when clicked, add a new element
    const li =document.createElement('li');
    li.className = 'collection-item';
    //in case of materialize css, ul should have a class of collection with li having class collection-item for uls to look good.
    
    //create  text node and appedn 
    li.appendChild(document.createTextNode(taskinput.value));

    //create a new link element for x link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //secondary content is used if we want to have something to the right of the list item.
    
    //add icon html
    link.innerHTML = '<i class="fa fa-remove" > </i> ';
    //append link to li
    li.appendChild(link);

    //append li to ul
    tasklist.appendChild(li);
    console.log(li);
    //clear input
    taskinput.value = '';

    //storing the task in local storage
    storetask(taskinput.value);

    e.preventDefault();

}

function storetask(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}


function removetask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
    // console.log(e.target);
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
    }
    }
}

function cleartask(e){
    //two ways to clear all the tasks at the same time
    // tasklist.innerHTML  = '';

    //faster method
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }
}

//query selector returns a node list, hence for each is directly used, if we have get element by id etc, html collection is returned, first convert it into an array followed by a for each
function filtertasks(e){
    const text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    })
}

//local storage
