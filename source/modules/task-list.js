/**
 * @name saveTask
 * @function
 * @description Adds new task to task list
 */
function saveTask() {
    let taskNameInput = document.getElementById('task-name');
    let taskList = document.getElementById('task-list');

    if (inputSanitizer(taskNameInput.value)){ // check for input
        alert('Please enter something!!');
        taskNameInput.focus();
        return;
    }
    let newTask = createCustomTaskTag(taskNameInput.value);
    taskList.appendChild(newTask);

    taskNameInput.value = '';
}



/**
 * @name selectTask
 * @function 
 * @description Display selected task at top of task list
 */
function selectTask() {
    let currentTask = document.getElementById('current-task');
    const tasks = document.querySelectorAll('input[name="task-option"]');
    for (let task of tasks) {
        if (task.checked) {
            currentTask.innerText = task.value;
            break;
        }
    }
}

/**
 * @name createCustomTaskTag
 * @function
 * @description Creates a custom tag for a task
 * @param {string} taskName task name
 * @returns {HTMLLIElement} returns a HTML li tag
 */
function createCustomTaskTag(taskName) {
    let taskContainer = document.createElement('li');
    let taskLabel = document.createElement('input');
    let editButton = document.createElement('i');
    let removeButton = document.createElement('i');
    let threeDots = document.createElement('i');
    let circleIcon = document.createElement('img');

    taskContainer.setAttribute('class', 'task');

    taskLabel.setAttribute('class', 'task-label');
    taskLabel.setAttribute('for', taskName);
    taskLabel.setAttribute('readonly', '');
    taskLabel.value = taskName;

    editButton.innerHTML   = '<img class="icon" src="./img/icons/edit-icon.svg" >'
    removeButton.innerHTML = '<img class="icon" src="./img/icons/delete-icon.svg" >';
    threeDots.innerHTML    = '<img class="icon" src="./img/icons/three-dots-icon.svg" >';
    circleIcon.src         = './img/icons/check-circle-icon-white.svg';
    circleIcon.style.width = '15px';

    taskContainer.appendChild(circleIcon);
    taskContainer.appendChild(taskLabel);
    taskContainer.appendChild(editButton);
    taskContainer.appendChild(removeButton);
    taskContainer.appendChild(threeDots);
    // Check off task when complete
    circleIcon.addEventListener('click', () => {
        if (taskContainer.getAttribute('done') != 'true') {
            taskContainer.setAttribute('done', 'true');
            circleIcon.src = './img/icons/check-circle-icon-black.svg';

        } else {
            taskContainer.setAttribute('done', 'false');
            circleIcon.src = './img/icons/check-circle-icon-white.svg';;
        }
    });
    // select current task
    taskContainer.addEventListener('click', () => {
        let currentTask = document.getElementById('current-task');
                currentTask.innerText = taskLabel.value;
    });
    // edit task label
    editButton.addEventListener('click', () => {
        taskLabel.removeAttribute('readonly');
        taskLabel.focus();
        taskLabel.select();
        taskLabel.addEventListener('keypress', (event) => {
            if (event.key == 'Enter') {
                taskLabel.setAttribute('readonly', '');
                //taskLabel.classList.remove('edit-label');
            }

        });
    });
    // remove task
    removeButton.addEventListener('click', () => {
        taskContainer.remove();
    });
    return taskContainer;
}


/**
 * @name clearAllTasks
 * @function
 * @description Clears Task List
 */
function clearAllTasks() {
    let taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
}

/**
 * @name clearCompletedTasks
 * @function
 * @description Clears Completed Tasks
 */
function clearCompletedTasks() {
    let taskList = document.getElementById('task-list');
    let children = taskList.children;
    for (let i = 0; i < children.length; i++) {
        if (children[i].getAttribute('done') == 'true') {
            taskList.removeChild(children[i]);
            i--;
        } 
    }
}

/**
 * @name inputSanitizer
 * @function
 * @description helper function - set TASK_CONTENT for editing task
 * @param content is the task container
 */
function inputSanitizer(input) {
    if (input == '')
        return true;
    return false;
}


 // Export all functions
 export {saveTask, createCustomTaskTag, clearAllTasks, selectTask, clearCompletedTasks };
