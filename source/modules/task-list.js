/**
 * @name addTaskButton
 * @function
 * @description Opens or closes add-task form
 */
function addTaskButton() {
    let button = document.getElementById("add-task-form");
    if (button.classList.contains("hidden") === true) {
        button.classList.remove("hidden");
    }
    else {
        button.classList.add("hidden");
    }
}

/**
 * @name cancelTask
 * @function
 * @description Closes add-task form
 */
function cancelTask() {
    document.getElementById("task-name").value = "";
    document.getElementById("add-task-form").classList.add("hidden");
}

/**
 * @name saveTask
 * @function
 * @description Adds new task to task list
 */
function saveTask() {
    let taskNameInput = document.getElementById("task-name");
    let taskList = document.getElementById("task-list");
    let newTask = createCustomTaskTag(taskNameInput.value);
    taskList.appendChild(newTask);
    cancelTask();
}

/**
 * @name setFinished
 * @function
 * @description Sets task attribute "finished" to true or false based on current state
 * @param {string} taskContainer container element of task
 * @returns 
 */
function setFinished(taskContainer) {
    if (taskContainer.getAttribute("finished") == false) {
        taskContainer.setAttribute('finished', 'true');
    } else {
        taskContainer.setAttribute('finished', 'false');
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
    let taskButton = document.createElement('input');
    let taskLabel = document.createElement('label');
    let editButton = document.createElement('button');

    // When user clicks on the task, it gets crossed off
    taskButton.addEventListener('click', setFinished(taskContainer));
    
    taskContainer.setAttribute('class', 'task');
    taskContainer.style.border = '3px solid black';
    taskContainer.setAttribute('finished', 'false');
    
    taskButton.setAttribute('type', 'button');

    taskButton.setAttribute('class', 'task-label');
    taskButton.value = taskName;
    taskLabel.contentEditable = false;

    editButton.innerText = 'Edit';

    // Let user edit the task's name when edit button is clicked
    editButton.addEventListener('click', () => {
        taskLabel.contentEditable = true;
        taskLabel.focus();
        taskLabel.addEventListener('keypress', (even) => { // turns off editability when hit enter key
            if (even.key === 'Enter')
                taskLabel.contentEditable = false;
        });
    });

    taskButton.appendChild(taskLabel);
    taskContainer.appendChild(taskButton);
    taskContainer.appendChild(editButton);
    return taskContainer;
}

/**
 * @name clearTasksButton
 * @function
 * @description Clears Task List
 */
function clearTasksButton() {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
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

 // Export all functions
 export { addTaskButton, cancelTask, saveTask, createCustomTaskTag, clearTasksButton }
