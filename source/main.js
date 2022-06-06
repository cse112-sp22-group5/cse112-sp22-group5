// Import modules

import {
  onStart,
  onReset,
  setCustomTime,
  keyboardShortcut,
} from "./modules/timer.js";
import { setBackgroundMusic } from "./modules/background-music.js";
import {
  saveTask,
  clearAllTasks,
  clearCompletedTasks,
  loadTaskListFromLocal,
} from "./modules/task-list.js";

import "./modules/side-nav-bar.js";
import { setDefaultSettings } from "./modules/side-nav-bar.js";

import { startWalkthrough, isReturningUser } from "./modules/walkthrough.js";

// import { googleTranslateElementInit } from "./modules/multi-language.js";

// googleTranslateElementInit();

// Timer
document
  .getElementById("form-enabler")
  .addEventListener("change", setCustomTime);
document.getElementById("start-button").addEventListener("click", onStart);
document.getElementById("reset-button").addEventListener("click", onReset);

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  // only allow this event to be fired when task form is hidden
  if (document.getElementById("tasks-div").style.width === 0)
    keyboardShortcut(event);
});
// document.getElementById('customize-start').addEventListener('click', customizeKey);
// document.getElementById('customize-volume-up').addEventListener('click', customizeKey);
// document.getElementById('customize-volume-down').addEventListener('click', customizeKey);

// Default button
document
  .getElementById("default-settings")
  .addEventListener("click", setDefaultSettings);

document
  .getElementById("bg-music")
  .addEventListener("change", setBackgroundMusic);

// Task List
document.getElementById("task-name").addEventListener("keypress", (event) => {
  if (event.key === "Enter")
    // allow user to hit enter to save task
    saveTask();
});

document.getElementById("save-button").addEventListener("click", saveTask);
document
  .getElementById("clear-tasks-button")
  .addEventListener("click", clearAllTasks);
document
  .getElementById("clear-completed-tasks-button")
  .addEventListener("click", clearCompletedTasks);

// load task list from localStorage if exists
window.addEventListener("load", loadTaskListFromLocal);
// Walkthrough
window.addEventListener("load", () => {
  if (!isReturningUser()) startWalkthrough();
});
document
  .getElementById("help-icon")
  .addEventListener("click", startWalkthrough);
