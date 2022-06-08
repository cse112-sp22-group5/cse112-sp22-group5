import { colorChange } from "./color-change.js";
import {
  showNotif,
  getNotificationStatus,
  playSound,
} from "./notifications.js";
import { breakReminders } from "./break-reminder.js";
import { updateProgress } from "./progress-bar.js";

let /** @type {number} **/
  POMO_MINS = 25,
  /** @type {number} **/
  SHORT_MINS = 5,
  /** @type {number} **/
  LONG_MINS = 15;

let /** @type {string} **/
  startKey = "Space",
  /** @type {string} **/
  volumeUpKey = "ArrowUp",
  /** @type {string} **/
  volumneDownKey = "ArrowDown",
  /** @type {boolean} **/
  isCustomizingKey = false,
  /** @type {set}  **/
  setKeys = new Set([startKey, volumeUpKey, volumneDownKey]);

const /** @constant @type {string} **/
  WORK_STATE = "Work State",
  /** @constant @type {string} **/
  SHORT_STATE = "Short Break",
  /** @constant @type {string} **/
  LONG_STATE = "Long Break";

const /** @constant @type {number} */
  MS = 1000,
  /** @constant @type {number} **/
  NUM_SEC = 60;

const /** @constant @type {number} **/
  STATE_MOD = 2,
  /** @constant @type {string} **/
  LONG_MOD = 4;

let /**
   * Stores the set interval
   * @type {number}
   */
  timerId,
  /**
   * Stores the reference to the web worker
   * @type {object}
   */
  worker;

/**
 * A timer
 * @typedef {object} Timer
 * @property {object} timerState            - The timerState values for the timer
 * @property {number} timerState.pomoMin    - The duration of one pomo (in minutes)
 * @property {number} timerState.shortBrk   - The duration of one short break (in minutes)
 * @property {number} timerState.longBrk    - The duration of one long break (in minutes)
 * @property {object} counter               - The counter values for the timer
 * @property {number} counter.stateCtr      - The number states the timer has cycled through
 * @property {number} counter.streak        - The number of pomos completed in a row without clicking reset
 * @property {number} counter.totalPomos    - The total number of pomos completed overall
 * @property {string} currState             - The current state of timer displayed to the user
 * @property {number} currDuration          - The total number of seconds the timer should run
 */
let timer = {
  timerState: {
    pomoMin: POMO_MINS,
    shortBrk: SHORT_MINS,
    longBrk: LONG_MINS,
  },
  counter: {
    stateCtr: 0,
    streak: 0,
    totalPomos: 0,
  },
  currState: WORK_STATE,
  currDuration: POMO_MINS * NUM_SEC,
};

/**
 * @name checkState
 * @function
 * @description Checks the current state and updates the timer display and duration accordingly
 */
function checkState() {
  // work state
  if (timer.counter.stateCtr % STATE_MOD === 0) {
    timer.currState = WORK_STATE;
    timer.currDuration = NUM_SEC * POMO_MINS;
    document.getElementById("state").innerText = WORK_STATE;
    document.getElementById("timer-display").innerText = `${POMO_MINS}:00`;
    //document.getElementById('tasks').className = `${document.getElementById('tasks').className} counting`;
  } else {
    // long break state
    if (timer.counter.totalPomos % LONG_MOD === 0) {
      timer.currState = LONG_STATE;
      timer.currDuration = NUM_SEC * LONG_MINS;
      document.getElementById("state").innerText = LONG_STATE;
      document.getElementById("timer-display").innerText = `${LONG_MINS}:00`;
      document.getElementById("reset-button").disabled = true; // disable reset button
    }
    // short break state
    else {
      timer.currState = SHORT_STATE;
      timer.currDuration = NUM_SEC * SHORT_MINS;
      document.getElementById("state").innerText = SHORT_STATE;
      document.getElementById("timer-display").innerText = `${SHORT_MINS}:00`;

      if (SHORT_MINS < 10) {
        let time = document.getElementById("timer-display").innerText;
        document.getElementById("timer-display").innerText = "0" + time;
      }
      document.getElementById("reset-button").disabled = true; // disable reset button
    }
  }
  colorChange();
}

/**
 * @name updateState
 * @function
 * @description Updates the state on display after the timer for the current state ends
 */
function updateState() {
  // if the current state is a work state, next state a break
  if (timer.currState === WORK_STATE) {
    // document.getElementById('tasks').className = 'tasks';
    // next state is a long break
    if (timer.counter.totalPomos % LONG_MOD === 0) {
      timer.currState = LONG_STATE;
      document.getElementById("state").innerText = LONG_STATE;
      document.getElementById("timer-display").innerText = `${LONG_MINS}:00`;
    }
    // next state is a short break
    else {
      timer.currState = SHORT_STATE;
      document.getElementById("state").innerText = SHORT_STATE;
      document.getElementById("timer-display").innerText = `${SHORT_MINS}:00`;
      let time = document.getElementById("timer-display").innerText;
      if (SHORT_MINS < 10) {
        time = "0" + time;
        document.getElementById("timer-display").innerText = time;
      }
    }
    document.getElementById("reset-button").disabled = true; // disable reset button
  }

  // if the current state is a break state, next state is a work state
  else {
    timer.currState = WORK_STATE;
    document.getElementById("state").innerText = WORK_STATE;
    document.getElementById("timer-display").innerText = `${POMO_MINS}:00`;
    document.getElementById("reset-button").disabled = true; // disable reset button
    // remove settings warning after 4 pomos
    if (document.getElementById("total").innerText % 4 == 0) {
      document.getElementById("warning").style.display = "none";
    }
  }
  colorChange();
  breakReminders();
  updateProgress();
}

/**
 * @name updateTimer
 * @function
 * @description Decrements the timer down to 0
 * @param {number} duration The total number of seconds the timer should run
 */
function updateTimer(duration) {
  let start = Date.now(),
    diff,
    minutes,
    seconds;

  /**
   * @name timerCountdown
   * @function
   * @description Begins the timer countdown and updates the timer display when web worker isn't supported
   */
  function timerCountdown() {
    // get the number of seconds that have elapsed since updateTimer() was called
    diff = duration - (((Date.now() - start) / MS) | 0);

    // truncates the float
    minutes = (diff / NUM_SEC) | 0;
    seconds = diff % NUM_SEC | 0;

    // add extra 0 to minutes/seconds if they are less than 10
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById(
      "timer-display"
    ).innerText = `${minutes}:${seconds}`;

    // stop timer when minutes and seconds reach 0
    if (Number(minutes) === 0 && Number(seconds) === 0) {
      clearInterval(timerId);

      // if curr state is work state, update the streak and total pomo count
      if (timer.currState === WORK_STATE) {
        timer.counter.streak++;
        document.getElementById("streak").innerText = timer.counter.streak;

        timer.counter.totalPomos++;
        document.getElementById("total").innerText = timer.counter.totalPomos;
      } else {
        document.querySelector("#form-enabler").removeAttribute("disabled");
      }

      // enable start button when timer ends
      document.getElementById("start-button").disabled = false;
      timer.counter.stateCtr++;

      // transition to the next state
      updateState();
      showNotif(timer.currState);
      if (document.getElementById("notif-toggle").checked) {
        playSound();
      }
    }
    if (diff <= 0) {
      // add one second so that the countdown starts at the full duration
      // example 05:00 not 04:59
      start = Date.now() + 1000;
    }
  }

  if (window.Worker) {
    worker = new Worker("./modules/worker.js", {
      type: "module",
    });
    // notify worker to start counting down timer
    worker.postMessage({
      msg: "counts down timer",
      payload: duration,
    });
    // handler to handle updating DOM elements whenever a message is received
    worker.onmessage = function (e) {
      let minutes = e.data.minutes;
      let seconds = e.data.seconds;
      document.getElementById(
        "timer-display"
      ).innerText = `${minutes}:${seconds}`;

      // stop timer when minutes and seconds reach 0
      if (minutes == 0 && seconds == 0) {
        // if curr state is work state, update the streak and total pomo count
        if (timer.currState === WORK_STATE) {
          timer.counter.streak++;
          document.getElementById("streak").innerText = timer.counter.streak;

          timer.counter.totalPomos++;
          document.getElementById("total").innerText = timer.counter.totalPomos;
        } else {
          document.querySelector("#form-enabler").removeAttribute("disabled");
        }

        // enable start button when timer ends
        document.getElementById("start-button").disabled = false;
        timer.counter.stateCtr++;

        // transition to the next state
        updateState();
        showNotif(timer.currState);
        if (document.getElementById("notif-toggle").checked) {
          playSound();
        }
      }
    };
  } else {
    // when the browser doesn't support web workers
    timerCountdown(); // don't wait a full second before the timer starts
    timerId = setInterval(timerCountdown, 10); // fires set interval often to give time to update
  }
}

/**
 * @name setCustomTime
 * @description Changes the times for each session based on user input
 */
function setCustomTime() {
  let wTime = document.getElementById("work-time");
  let sbTime = document.getElementById("short-break-time");
  let lbTime = document.getElementById("long-break-time");
  let warning = document.getElementById("warning");

  // prevent number inputs from showing below the minimum and upating the timer even if it below the min
  if (Number(wTime.value) < 25) {
    POMO_MINS = 25;
    wTime.value = POMO_MINS;
    return;
  } else if (Number(sbTime.value) < 5) {
    SHORT_MINS = 5;
    sbTime.value = 5;
    return;
  } else if (Number(lbTime.value) < 15) {
    LONG_MINS = 15;
    lbTime.value = LONG_MINS;
    return;
  }

  if (
    Number(wTime.value) <= Number(sbTime.value) ||
    Number(wTime.value) <= Number(lbTime.value)
  ) {
    // enable a warning
    warning.innerText = "Work Periods must be greater than Break Periods";
    warning.style.display = "block";

    // keep the drop down values the same as the current timer settings
    wTime.value = POMO_MINS.toString();
    sbTime.value = SHORT_MINS.toString();
    lbTime.value = LONG_MINS.toString();
    return;
  }

  // otherwise do not display a warning
  warning.style.display = "none";

  // set the new time preferences
  POMO_MINS = Number(wTime.value);
  document.getElementById("timer-display").innerText = `${POMO_MINS}:00`;
  SHORT_MINS = Number(sbTime.value);
  LONG_MINS = Number(lbTime.value);
}

/**
 * @name onStart
 * @function
 * @description Begins the timer when the start button is clicked
 */
function onStart() {
  getNotificationStatus();
  document.querySelector("#form-enabler").disabled = true;
  document.getElementById("default-settings").disabled = true; // disable default settings btn

  // enable a warning if the user tries changing the time limits during a pomo
  document.getElementById("warning").innerText =
    "Wait until the end of your next break to change the times!";
  document.getElementById("warning").style.display = "block";

  document.getElementById("start-button").disabled = true; // disable start button
  document.getElementById("reset-button").disabled = false; // enable reset button

  checkState();
  updateTimer(timer.currDuration); // update the timer display
}

/**
 * @name onReset
 * @function
 * @description Resets the timer to the beginning of its current state when the reset button is clicked
 */
function onReset() {
  document.getElementById("reset-button").disabled = true;
  document.getElementById("start-button").disabled = false;
  document.getElementById("warning").style.display = "none";
  document.getElementById("default-settings").disabled = false;
  document.getElementById("form-enabler").removeAttribute("disabled");
  document.title = "Productoro";
  timer.counter.streak = 0;
  document.getElementById("streak").innerText = timer.counter.streak;
  if (window.Worker) {
    worker.postMessage({
      msg: "resets timer",
    });
  } else {
    clearInterval(timerId);
  }
  checkState();
  // document.getElementById('tasks').className = 'tasks';
}

/**
 * @name setDefaultSettings
 * @function
 * @description Set timer, music, keyboard shortcuts, and alarm settings to default values
 */
function setDefaultSettings() {
  POMO_MINS = 25;
  SHORT_MINS = 5;
  LONG_MINS = 15;

  const defaultSetting = {
    "work-time": "25",
    "short-break-time": "5",
    "long-break-time": "15",
    "bg-music": "None",
    "keyboard-toggle": "on",
    "notif-toggle": "on",
    "alarm-volume": "50",
    "alarm-sounds": "1",
  };

  for (const key in defaultSetting) {
    document.getElementById(key).value = defaultSetting[key];
  }

  setCustomTime();
}

/**
 * @name revealSettings
 * @function
 * @description Opens the settings modal when the settings button is clicked
 */
function revealSettings() {
  document.getElementById("settings-modal").showModal();
}

/**
 * @name hideSettings
 * @description Closes the settings modal when the 'x' inside the modal or anywhere outside of the modal is clicked
 */
function hideSettings() {
  document.getElementById("settings-modal").close();

  if (
    document.getElementById("warning").innerText ===
    "Work Periods must be greater than Break Periods"
  ) {
    document.getElementById("warning").style.display = "none";
  }
  document.getElementById("settings-button").disabled = false;
}

/**
 * @name keyboardShortcut
 * @function
 * @description Starts and resets timer when the space bar is clicked
 * @param {*} event The keyboard button that is clicked
 */
function keyboardShortcut(event) {
  if (
    document.getElementById("keyboard-toggle").value === "on" &&
    !isCustomizingKey
  ) {
    if (event.code === startKey) {
      // if the timer is static, start timer
      if (document.getElementById("start-button").disabled == false) {
        onStart();
      }
      // if timer is running, reset timer
      else {
        if (timer.currState === WORK_STATE) {
          onReset();
        }
      }
    }

    if (event.code === volumeUpKey) {
      let curVol = document.getElementById("alarm-volume").value;
      document.getElementById("alarm-volume").value = parseInt(curVol, 10) + 10;
    }
    if (event.code === volumneDownKey) {
      let curVol = document.getElementById("alarm-volume").value;
      document.getElementById("alarm-volume").value = parseInt(curVol, 10) - 10;
    }

    event.preventDefault();
  }
}

/**
 * @name customizeKey
 * @description Allows for keyboard shortcuts to be customized
 */
function customizeKey() {
  const KEY_ERROR = "Key already in use. Try again.";

  // check to see which keyboard customization button was pressed
  if (document.getElementById("keyboard-toggle").value === "on") {
    isCustomizingKey = true;
    this.blur();
    // store current set key before replacing with "press key" prompt
    let currentKey = this.innerHTML.replace(/ /g, "");
    this.innerHTML = "Press a key";

    setKeys.delete(currentKey);

    // remove respective keyboard shortcut in prep for new one
    switch (this.id) {
      case "customize-start":
        startKey = null;
        break;
      case "customize-volume-up":
        volumeUpKey = null;
        break;
      case "customize-volume-down":
        volumneDownKey = null;
        break;
      default:
        this.innerHTML = "Press a key";
    }

    // take user input for key customization
    document.addEventListener(
      "keydown",
      (event) => {
        isCustomizingKey = false;
        if (event.code != currentKey && setKeys.has(event.code)) {
          this.innerHTML = KEY_ERROR;
          return;
        }
        this.innerHTML = event.code;
        setKeys.add(event.code);

        // customize respective shortcut based on button pressed
        switch (this.id) {
          case "customize-start":
            startKey = event.code;
            break;
          case "customize-volume-up":
            volumeUpKey = event.code;
            break;
          case "customize-volume-down":
            volumneDownKey = event.code;
            break;
          default:
            this.innerHTML = "Press a key";
        }
      },
      { once: true }
    );
  }
}

/**
 * @name getSetKeys
 * @function
 * @description Gets the currently set keyboard shortcuts object for testing purposes
 * @return {Set} The Set object containing the shortcuts
 */
function getSetKeys() {
  return setKeys;
}

// export functions and variables for testing
export {
  onStart,
  onReset,
  checkState,
  updateState,
  timer,
  setCustomTime,
  keyboardShortcut,
  revealSettings,
  hideSettings,
  customizeKey,
  getSetKeys,
  setDefaultSettings,
  SHORT_STATE,
  LONG_STATE,
  WORK_STATE,
  POMO_MINS,
  SHORT_MINS,
  LONG_MINS,
};
