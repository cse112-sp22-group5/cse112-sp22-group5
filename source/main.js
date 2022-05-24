// Import modules

import {
  onStart,
  onReset,
  setCustomTime,
  keyboardShortcut,
  revealSettings,
  hideSettings,
} from "./modules/timer.js";
import { revealHelp, hideHelp } from "./modules/help.js";
// imports not used, so commented out
// import { showNotif, getNotificationStatus, playSound, getAlarm } from './modules/notifications.js';
// import { colorChange } from './modules/color-change.js';
// import { breakReminders } from './modules/break-reminder.js';
import { setBackgroundMusic } from "./modules/background-music.js";
import {
  addTaskButton,
  cancelTask,
  saveTask,
  clearAllTasks,
  clearCompletedTasks,
} from "./modules/task-list.js";

// Timer
document
  .getElementById("form-enabler")
  .addEventListener("change", setCustomTime);
document.getElementById("start-button").addEventListener("click", onStart);
document.getElementById("reset-button").addEventListener("click", onReset);

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  // only allow this event to be fired when task form is hidden
  if (document.getElementById("add-task-form").classList.contains("hidden"))
    keyboardShortcut(event);
});

// Modals
document.getElementById("help-button").addEventListener("click", revealHelp);
document.getElementById("close-modal-x").addEventListener("click", hideHelp);
document
  .getElementById("settings-button")
  .addEventListener("click", revealSettings);
document
  .getElementById("close-settings-btn")
  .addEventListener("click", hideSettings);

document
  .getElementById("bg-music")
  .addEventListener("change", setBackgroundMusic);

// Task List
document
  .getElementById("add-tasks-button")
  .addEventListener("click", addTaskButton);
document.getElementById("task-name").addEventListener("keypress", (event) => {
  if (event.key === "Enter")
    // allow user to hit enter to save task
    saveTask();
});
document.getElementById("save-button").addEventListener("click", saveTask);
document.getElementById("cancel-button").addEventListener("click", cancelTask);
document
  .getElementById("clear-tasks-button")
  .addEventListener("click", clearAllTasks);
document
  .getElementById("clear-completed-tasks-button")
  .addEventListener("click", clearCompletedTasks);

// Register Service Worker
/* eslint-disable no-unused-vars */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("../serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
/* eslint-enable no-unused-vars */
