// Import modules

import { onStart, onReset, checkState, updateState, timer, setCustomTime, keyboardShortcut, revealSettings, hideSettings} from './modules/timer.js';
import { revealHelp, hideHelp } from './modules/help.js';
import { showNotif, getNotificationStatus, playSound, getAlarm } from './modules/notifications.js';
import { colorChange } from './modules/color-change.js';
import { breakReminders } from './modules/break-reminder.js'
import { addTaskButton, cancelTask, saveTask, createCustomTaskTag, finishTask } from './modules/task-list.js'

// Timer
document.getElementById('form-enabler').addEventListener('change', setCustomTime);
document.getElementById('start-button').addEventListener('click', onStart);
document.getElementById('reset-button').addEventListener('click', onReset);

// Keyboard shortcuts
document.addEventListener('keydown', keyboardShortcut);

// Modals
document.getElementById('help-button').addEventListener('click', revealHelp);
document.getElementById('close-modal').addEventListener('click', hideHelp);
document.getElementById('settings-button').addEventListener('click', revealSettings);
document.getElementById('close-settings').addEventListener('click', hideSettings);

// Task list
document.getElementById('addTasksButton').addEventListener('click',addTaskButton);
document.getElementById('saveButton').addEventListener('click',saveTask);
document.getElementById('cancelButton').addEventListener('click',cancelTask);

  