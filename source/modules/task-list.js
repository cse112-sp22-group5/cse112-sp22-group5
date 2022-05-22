/** These variables are for the save task and edit task.
 * Using the same form for save task and edit task
 * SAVE_ON: adding new task
 * EDIT_ON: eddting task
 * TASK_CONTENT: the content of the current edited task
 * if a task has more content, adjust this variable
*/
const SAVE_ON = true;
const EDIT_ON = false;
let SAVE_FLAG = SAVE_ON;
let TASK_CONTENT = null;


/**
 * @name addTaskButton
 * @function
 * @description Opens or closes add-task form
 */
function addTaskButton() {
    const taskModal = document.getElementById('task-add-modal');
    taskModal.showModal();
}

/**
 * @name cancelTask
 * @function
 * @description Closes add-task form
 */
function cancelTask() {
    document.getElementById('task-name').value = '';
    setSaveFlag(SAVE_ON);
    setTaskContent(null);
    //document.getElementById('task-add-modal').close();
}

/**
 * @name saveTask
 * @function
 * @description Adds new task to task list
 */
function saveTask() {
    let taskNameInput = document.getElementById('task-name');
    let taskList = document.getElementById('task-list');

    if (SAVE_FLAG === SAVE_ON) { // Save new task
        if (inputSanitizer(taskNameInput.value)){ // check for input
            alert('Please enter something!!');
            taskNameInput.focus();
            return;
        }
        
        let newTask = createCustomTaskTag(taskNameInput.value);
        taskList.appendChild(newTask);
    }
    else { // edit old task
        TASK_CONTENT.innerText = taskNameInput.value;
    }
    cancelTask();
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
    let taskLabel = document.createElement('label');
    let taskButton = document.createElement('input');
    let editButton = document.createElement('i');
    let removeButton = document.createElement('i');
    let threeDots = document.createElement('i');
    let circleIcon = document.createElement('img');

    taskContainer.setAttribute('class', 'task');
    
    // When user clicks on the task, it gets crossed off
    taskButton.setAttribute('type', 'checkbox');
    taskButton.setAttribute('id', taskName);
    taskButton.setAttribute('class', 'task-button');
    taskButton.setAttribute('visibility', 'hidden');
    taskButton.setAttribute('name', 'task-option');
    taskContainer.addEventListener('click', function() {
        let currentTask = document.getElementById('current-task');
                currentTask.innerText = taskLabel.innerText;

    });

    taskLabel.setAttribute('class', 'task-label');
    taskLabel.setAttribute('for', taskName);
    taskLabel.innerText = taskName;
    taskLabel.contentEditable = false;

    editButton.innerHTML   = '<img class="icon" src="./img/icons/edit-icon.svg" >'
    removeButton.innerHTML = '<img class="icon" src="./img/icons/delete-icon.svg" >';
    threeDots.innerHTML    = '<img class="icon" src="./img/icons/three-dots-icon.svg" >';
    circleIcon.src         = './img/icons/check-circle-icon-white.svg';
    circleIcon.style.width = '15px';
    // Check off task when complete
    circleIcon.addEventListener('click', () => {
        if (taskButton.getAttribute('done') != 'true') {
            taskButton.setAttribute('done', 'true');
            circleIcon.src = './img/icons/check-circle-icon-black.svg';

        } else {
            taskButton.setAttribute('done', 'false');
            circleIcon.src = './img/icons/check-circle-icon-white.svg';;
        }
    });
    taskContainer.appendChild(circleIcon);
    taskContainer.appendChild(taskButton);
    taskContainer.appendChild(taskLabel);
    taskContainer.appendChild(threeDots);
    taskContainer.appendChild(removeButton);
    taskContainer.appendChild(editButton);
  
    // edit task label
    editButton.addEventListener('click', () => {
        taskLabel.contentEditable = true;
        taskLabel.focus();
        taskLabel.addEventListener('keypress', (event) => {
            if (event.key == 'Enter') {
                taskLabel.contentEditable = false;
                taskLabel.classList.remove('edit-label');
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
 * @name setEditTask
 * @function
 * @description Set up edit task
 * @param taskLabel task name
 * @param editButton edit button of the task
 */
function setEditTask(taskLabel, editButton) {
    editButton.addEventListener('click', () => {
        loadForm(taskLabel);
    });
}

/**
 * @name loadForm
 * @function
 * @description Load content form a task to task form
 * @param content the content of the task
 */
function loadForm(content){
    let taskName = document.getElementById('task-name');
    taskName.value = content.innerText;
//    document.getElementById('task-add-modal').showModal();
    setTaskContent(content);
    setSaveFlag(EDIT_ON);

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
        if (children[i].children[1].getAttribute('done') == 'true') {
            taskList.removeChild(children[i]);
            i--;
        } 
    }
}

/**
 * @name setSaveFlag
 * @function
 * @description helper function - set SAVE_FLAG for saving new task or editing task
 * @param value SAVE_ON or EDIT_ON
 */
function setSaveFlag(value) {
    SAVE_FLAG = value;
}

/**
 * @name setTaskContent
 * @function
 * @description helper function - set TASK_CONTENT for editing task
 * @param content is the task container
 */
function setTaskContent(content) {
    TASK_CONTENT = content;
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
 export { addTaskButton, cancelTask, saveTask, createCustomTaskTag, clearAllTasks, selectTask, clearCompletedTasks };
