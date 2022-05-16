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
    let button = document.getElementById('add-task-form');
    if (button.classList.contains('hidden') === true) {
        button.classList.remove('hidden');
        document.getElementById('task-name').focus();
    }
    else {
        button.classList.add('hidden');
    }
}

/**
 * @name cancelTask
 * @function
 * @description Closes add-task form
 */
function cancelTask() {
    document.getElementById('task-name').value = "";
    document.getElementById('add-task-form').classList.add('hidden');
    setSaveFlag(SAVE_ON);
    setTaskContent(null);
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
    let editButton = document.createElement('button');
    let doneButton = document.createElement('button');

    taskContainer.setAttribute('class', 'task');
    taskContainer.style.border = '3px solid black';
    
    // When user clicks on the task, it gets crossed off
    taskButton.setAttribute('type', 'radio');
    taskButton.setAttribute('id', taskName);
    taskButton.setAttribute('class', 'task-button');
    taskButton.setAttribute('name', 'task-option');
    taskButton.addEventListener('click', function() {
        let currentTask = document.getElementById('current-task');
            if (this.checked) {
                currentTask.innerText = taskLabel.innerText;
            }
    });

    taskLabel.setAttribute('class', 'task-label');
    taskLabel.setAttribute('for', taskName);
    taskLabel.innerText = taskName;

    editButton.innerText = 'Edit';
    doneButton.innerText = 'Done';
    doneButton.style = 'margin-left:50px';

    // Check off task when complete
    doneButton.addEventListener('click', () => {
        if (taskButton.getAttribute('done') != 'true') {
            taskButton.setAttribute('done', 'true');
        } else {
            taskButton.setAttribute('done', 'false');
        }
        
    });

    taskContainer.appendChild(taskButton);
    taskContainer.appendChild(taskLabel);
    taskContainer.appendChild(editButton);
    taskContainer.appendChild(doneButton);
    setEditTask(taskLabel, editButton);
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
    document.getElementById('add-task-form').classList.remove('hidden');
    taskName.value = content.innerText;
    taskName.focus();
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
        if (children[i].children[0].getAttribute('done') == 'true') {
            taskList.removeChild(children[i]);
            i--;
        } 
    }
}

/**
 * @name 
 * @function
 * @description 
 */

/**
 * @name 
 * @function
 * @description 
 */

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
