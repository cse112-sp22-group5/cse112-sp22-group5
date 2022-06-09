// Import modules

import {
  onStart,
  onReset,
  setCustomTime,
  keyboardShortcut,
  setDefaultSettings,
} from "./modules/timer.js";
import { setBackgroundMusic } from "./modules/background-music.js";
import {
  saveTask,
  clearAllTasks,
  clearCompletedTasks,
  loadTaskListFromLocal,
} from "./modules/task-list.js";

import { sidebarInit } from "./modules/side-nav-bar.js";

import {
  setTheme,
  loadBackgroundImages,
  loadThemeFromStorage,
  setBGImage,
  setBGFromURL,
  setDefaultThemes,
} from "./modules/skins-themes.js";
import { startWalkthrough, isReturningUser } from "./modules/walkthrough.js";

// Timer
document
  .getElementById("form-enabler")
  .addEventListener("change", setCustomTime);
document.getElementById("start-button").addEventListener("click", onStart);
document.getElementById("reset-button").addEventListener("click", onReset);

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  // only allow this event to be fired when task form is hidden
  if (document.activeElement !== document.querySelector("#task-name"))
    keyboardShortcut(event);
});

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

// Themes
document.getElementById("theme").addEventListener("change", () => {
  const htmlDoc = document.documentElement;
  const theme = document.getElementById("theme").value;
  setTheme(htmlDoc, theme);
});
document.getElementById("color-blindness").addEventListener("change", () => {
  const htmlDoc = document.documentElement;
  const theme = document.getElementById("color-blindness").value;
  setTheme(htmlDoc, theme);
});

document.getElementById("bg-url-submit").addEventListener("click", () => {
  const url = document.getElementById("bg-url").value;
  setBGFromURL(url);
});

document.getElementById("theme-default").addEventListener("click", () => {
  setDefaultThemes();
});

// Load task list from local storage
window.addEventListener("load", () => {
  sidebarInit();
  loadBackgroundImages();

  loadThemeFromStorage();
  loadTaskListFromLocal();
  setBGImage();
});

// Walkthrough
window.addEventListener("load", () => {
  if (!isReturningUser()) startWalkthrough();
});
document
  .getElementById("help-icon")
  .addEventListener("click", startWalkthrough);
