import {
  setObj,
  storeToLocal,
  removeDataFromStorage,
  retrieveDataFromStorage,
  deleteFromLocal,
} from "./localStorage.js";

setObj("taskList");
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
  storeToLocal(taskNameInput.value, false);
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

  taskLabel.setAttribute("class", "task-label");
  taskLabel.setAttribute("for", taskName);
  taskLabel.setAttribute("readonly", "");
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
    if (taskContainer.getAttribute("done") != "true") {
      taskContainer.setAttribute("done", "true");
      circleIcon.src = "./img/icons/check-circle-icon-black.svg";
      storeToLocal(taskLabel.value, true);
    } else {
      taskContainer.setAttribute("done", "false");
      circleIcon.src = "./img/icons/check-circle-icon-white.svg";
      storeToLocal(taskLabel.value, false);
    }
  });
  // select current task
  taskContainer.addEventListener("click", () => {
    let currentTask = document.getElementById("current-task");
    currentTask.innerText = taskLabel.value;
  });
  // edit task label
  editButton.addEventListener("click", () => {
    deleteFromLocal(taskLabel.value);
    taskLabel.removeAttribute("readonly");
    taskLabel.focus();
    taskLabel.select();
    taskLabel.addEventListener("keypress", (event) => {
      if (event.key == "Enter") {
        taskLabel.setAttribute("readonly", "");
        taskLabel.blur();
        storeToLocal(
          taskLabel.value,
          taskContainer.getAttribute("done") == "true" ? true : false
        );
      }
    });
  });
  // remove task
  removeButton.addEventListener("click", () => {
    taskContainer.remove();
    deleteFromLocal(taskLabel.value);
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
  taskList.innerHTML = "";
  removeDataFromStorage();
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
      deleteFromLocal(children[i].children[1].value);
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
  if (input == "") return true;
  return false;
}

/**
 * @name loadTaskListFromLocal
 * @function
 * @description load task list from local storage
 */
function loadTaskListFromLocal() {
  const taskListLocal = retrieveDataFromStorage("taskList");
  const taskList = document.getElementById("task-list");
  for (const taskName in taskListLocal) {
    let newTask = createCustomTaskTag(taskName, taskListLocal[taskName]);
    taskList.appendChild(newTask);
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
