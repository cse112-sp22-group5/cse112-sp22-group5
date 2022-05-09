// Import modules

import { onStart, onReset, checkState, updateState, timer, setCustomTime, keyboardShortcut, revealSettings, hideSettings} from './modules/timer.js';
import { revealHelp, hideHelp } from './modules/help.js';
import { showNotif, getNotificationStatus, playSound, getAlarm } from './modules/notifications.js';
import { colorChange } from './modules/color-change.js';
import { addTaskButton, cancelTask, saveTask, createCustomTaskTag, clearTasksButton } from './modules/task-list.js'
import { breakReminders } from './modules/break-reminder.js'
import {googleTranslateElementInit} from "./modules/muli-language.js";

googleTranslateElementInit();
// Timer
document.getElementById('form-enabler').addEventListener('change', setCustomTime);
document.getElementById('start-button').addEventListener('click', onStart);
document.getElementById('reset-button').addEventListener('click', onReset);

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    // only allow this event to be fired when task form is hidden
    if (document.getElementById("add-task-form").classList.contains("hidden"))
        keyboardShortcut(event);
});

// Modals
document.getElementById('help-button').addEventListener('click', revealHelp);
document.getElementById('close-modal').addEventListener('click', hideHelp);
document.getElementById('settings-button').addEventListener('click', revealSettings);
document.getElementById('close-settings').addEventListener('click', hideSettings);


// Task List
document.getElementById("add-tasks-button").addEventListener("click", addTaskButton);
document.getElementById("task-name").addEventListener("keypress", (event) => {
    if (event.key === "Enter") // allow user to hit enter to save task
        saveTask();
})
document.getElementById('save-button').addEventListener('click', saveTask);
document.getElementById('cancel-button').addEventListener('click', cancelTask);
document.getElementById('clear-tasks-button').addEventListener('click', clearTasksButton);

