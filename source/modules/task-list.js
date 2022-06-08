import {
  storeToLocal,
  removeDataFromStorage,
  retrieveDataFromStorage,
  deleteFromLocal,
} from "./localStorage.js";

// Set Object name in localStorage
const LOCAL_KEY = "taskList";

/**
 * @name saveTask
 * @function
 * @description Adds new task to task list
 */
function saveTask() {
  let taskNameInput = document.getElementById("task-name");
  let taskList = document.getElementById("task-list");

  if (inputSanitizer(taskNameInput.value)) {
    // check for input
    alert("Please enter something!!");
    taskNameInput.focus();
    return;
  }
  let newTask = createCustomTaskTag(taskNameInput.value);
  taskList.appendChild(newTask);
  storeToLocal(LOCAL_KEY, taskNameInput.value, false);
  taskNameInput.value = "";
}

/**
 * @name selectTask
 * @function
 * @description Display selected task at top of task list
 */
function selectTask() {
  let currentTask = document.getElementById("current-task");
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
 * @param {boolean} isDone whether the task is done or not
 * @returns {HTMLLIElement} returns a HTML li tag
 */
function createCustomTaskTag(taskName, isDone = false) {
  let taskContainer = document.createElement("li");
  let taskLabel = document.createElement("input");
  let editButton = document.createElement("i");
  let removeButton = document.createElement("i");
  let threeDots = document.createElement("i");
  let circleIcon = document.createElement("img");

  taskContainer.setAttribute("class", "task");
  taskContainer.setAttribute("done", "false");

  taskLabel.setAttribute("class", "task-label");
  taskLabel.setAttribute("for", taskName);
  taskLabel.setAttribute("readonly", "");
  taskLabel.setAttribute("isCurrentTask", "false");
  taskLabel.value = taskName;

  editButton.innerHTML =
    '<img class="icon" src="./img/icons/edit-icon.svg" title="edit" alt="edit">';
  removeButton.innerHTML =
    '<img class="icon" src="./img/icons/delete-icon.svg" title="delete" alt="delete">';
  threeDots.innerHTML =
    '<img class="icon" src="./img/icons/three-dots-icon.svg" title="something else" alt="something else">';
  circleIcon.style.width = "15px";
  if (isDone) {
    taskContainer.setAttribute("done", "true");
    circleIcon.src = "./img/icons/check-circle-icon-black.svg";
  } else circleIcon.src = "./img/icons/check-circle-icon-white.svg";

  taskContainer.appendChild(circleIcon);
  taskContainer.appendChild(taskLabel);
  taskContainer.appendChild(editButton);
  taskContainer.appendChild(removeButton);
  taskContainer.appendChild(threeDots);
  // Check off task when complete
  circleIcon.addEventListener("click", () => {
    if (taskContainer.getAttribute("done") == "false") {
      taskContainer.setAttribute("done", "true");
      circleIcon.src = "./img/icons/check-circle-icon-black.svg";
      taskLabel.style.textDecoration = "line-through";
      storeToLocal(LOCAL_KEY, taskLabel.value, "true");
    } else {
      taskContainer.setAttribute("done", "false");
      circleIcon.src = "./img/icons/check-circle-icon-white.svg";
      taskLabel.style.textDecoration = "";
      storeToLocal(LOCAL_KEY, taskLabel.value, "false");
    }
  });
  // select current task
  taskLabel.addEventListener("click", () => {
    let currentTask = document.getElementById("current-task");
    currentTask.innerText = taskLabel.value;
    document.getElementById("current-task-section").style.display = "block";

    let taskList = document.getElementById("task-list");
    let children = taskList.children;
    for (let i = 0; i < children.length; i++) {
      if (
        children[i]
          .getElementsByClassName("task-label")[0]
          .getAttribute("isCurrentTask") == "true"
      )
        children[i]
          .getElementsByClassName("task-label")[0]
          .setAttribute("isCurrentTask", "false");
    }
    taskLabel.setAttribute("isCurrentTask", "true");
  });
  // edit task label
  editButton.addEventListener("click", () => {
    let isCurrentTaskEdited = false;
    let currentTask = document.getElementById("current-task");
    if (currentTask.innerText == taskLabel.value) isCurrentTaskEdited = true;

    deleteFromLocal(LOCAL_KEY, taskLabel.value);
    taskLabel.removeAttribute("readonly");
    taskLabel.focus();
    taskLabel.select();

    // user hits enter
    taskLabel.addEventListener("keypress", (event) => {
      if (event.key == "Enter") {
        taskLabel.setAttribute("readonly", "");
        taskLabel.blur();
        if (isCurrentTaskEdited) currentTask.innerText = taskLabel.value;
        storeToLocal(
          LOCAL_KEY,
          taskLabel.value,
          taskContainer.getAttribute("done") == "true" ? true : false
        );
      }
    });

    // user clicks outside the taskLabel
    taskLabel.addEventListener("focusout", () => {
      taskLabel.setAttribute("readonly", "");
      taskLabel.blur();
      if (isCurrentTaskEdited) currentTask.innerText = taskLabel.value;
      storeToLocal(
        LOCAL_KEY,
        taskLabel.value,
        taskContainer.getAttribute("done") == "true" ? true : false
      );
    });
  });

  // remove task
  removeButton.addEventListener("click", () => {
    taskContainer.remove();
    deleteFromLocal(LOCAL_KEY, taskLabel.value);
    let currentTask = document.getElementById("current-task");
    currentTask.innerText = "";
  });
  return taskContainer;
}

/**
 * @name clearAllTasks
 * @function
 * @description Clears Task List
 */
function clearAllTasks() {
  let taskList = document.getElementById("task-list");
  document.getElementById("current-task").innerText = "";
  taskList.innerHTML = "";

  removeDataFromStorage(LOCAL_KEY);
  document.getElementById("current-task-section").style.display = "none";
}

/**
 * @name clearCompletedTasks
 * @function
 * @description Clears Completed Tasks
 */
function clearCompletedTasks() {
  let taskList = document.getElementById("task-list");
  let children = taskList.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].getAttribute("done") == "true") {
      let currentTask = document.getElementById("current-task");
      if (
        children[i]
          .getElementsByClassName("task-label")[0]
          .getAttribute("isCurrentTask") == "true"
      ) {
        currentTask.innerText = "";
      }
      deleteFromLocal(LOCAL_KEY, children[i].children[1].value);
      taskList.removeChild(children[i]);
      i--;
    }
  }

  // if there are no tasks left, hide the task list div
  if (Object.keys(retrieveDataFromStorage(LOCAL_KEY)).length === 0) {
    document.getElementById("current-task-section").style.display = "none";
  }
}

/**
 * @name inputSanitizer
 * @function
 * @description helper function - set TASK_CONTENT for editing task
 * @param content is the task container
 */
function inputSanitizer(input) {
  if (input == "") return true;
  return false;
}

/**
 * @name loadTaskListFromLocal
 * @function
 * @description load task list from local storage
 */
function loadTaskListFromLocal() {
  const taskListLocal = retrieveDataFromStorage(LOCAL_KEY);
  const taskList = document.getElementById("task-list");
  for (const taskName in taskListLocal) {
    let newTask = createCustomTaskTag(taskName, taskListLocal[taskName]);
    taskList.appendChild(newTask);
  }

  if (Object.keys(taskListLocal).length === 0) {
    document.getElementById("current-task-section").style.display = "none";
  }
}

// Export all functions
export {
  saveTask,
  createCustomTaskTag,
  clearAllTasks,
  selectTask,
  clearCompletedTasks,
  loadTaskListFromLocal,
};
