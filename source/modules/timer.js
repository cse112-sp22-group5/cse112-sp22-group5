import { colorChange } from './color-change.js';
import { showNotif, getNotificationStatus, playSound} from './notifications.js';
import { breakReminders } from './break-reminder.js';
import { progressBar } from './progress-bar.js';

let 
    /** @type {number} **/ 
    POMO_MINS = 25, 
    /** @type {number} **/ 
    SHORT_MINS = 5, 
    /** @type {number} **/ 
    LONG_MINS = 15;

let
    /** @type {string} **/
    startKey = 'Space',
    /** @type {string} **/
    volumeUpKey = 'ArrowUp',
    /** @type {string} **/
    volumneDownKey = 'ArrowDown',
    /** @type {boolean} **/
    isCustomizingKey = false;

const 
    /** @constant @type {string} **/ 
    WORK_STATE = 'Work State', 
    /** @constant @type {string} **/ 
    SHORT_STATE = 'Short Break State', 
    /** @constant @type {string} **/ 
    LONG_STATE = 'Long Break State';

const 
    /** @constant @type {number} */
    MS = 1000,
    /** @constant @type {number} **/ 
    NUM_SEC = 60;

const 
    /** @constant @type {number} **/ 
    STATE_MOD = 2,
    /** @constant @type {string} **/ 
    LONG_MOD = 4;

/** 
 * Stores the set interval
 * @type {number} 
 */
let timerId;

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
        longBrk: LONG_MINS
    },
    counter: {
        stateCtr: 0,
        streak: 0,
        totalPomos: 0
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
        document.getElementById('state').innerText = WORK_STATE;
        document.getElementById('timer-display').innerText = `${POMO_MINS}:00`;
    } 
    else {
        // long break state
        if (timer.counter.totalPomos % LONG_MOD === 0) {
            timer.currState = LONG_STATE;
            timer.currDuration = NUM_SEC * LONG_MINS;
            document.getElementById('state').innerText = LONG_STATE;
            document.getElementById('timer-display').innerText = 
                `${LONG_MINS}:00`;
            document.getElementById('reset-button').disabled = true; // disable reset button
        } 
        // short break state
        else {
            timer.currState = SHORT_STATE;
            timer.currDuration = NUM_SEC * SHORT_MINS;
            document.getElementById('state').innerText = SHORT_STATE;
            document.getElementById('timer-display').innerText = 
                `${SHORT_MINS}:00`;
            
            if(SHORT_MINS < 10) {
                let time = document.getElementById('timer-display').innerText; 
                document.getElementById('timer-display').innerText = '0' + time;
            } 
            document.getElementById('reset-button').disabled = true; // disable reset button
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
    if(timer.currState === WORK_STATE) {
        // next state is a long break 
        if(timer.counter.totalPomos % LONG_MOD === 0) {
            timer.currState = LONG_STATE;
            document.getElementById('state').innerText = LONG_STATE;
            document.getElementById('timer-display').innerText = 
                `${LONG_MINS}:00`;    
        }
        // next state is a short break 
        else {
            timer.currState = SHORT_STATE;
            document.getElementById('state').innerText = SHORT_STATE;
            document.getElementById('timer-display').innerText = 
                `${SHORT_MINS}:00`;
            let time = document.getElementById('timer-display').innerText; 
            if(SHORT_MINS < 10) {
                time = '0' + time;
                document.getElementById('timer-display').innerText = time;
            } 
        }
        document.getElementById('reset-button').disabled = true; // disable reset button
    }

    // if the current state is a break state, next state is a work state
    else {
        timer.currState = WORK_STATE;
        document.getElementById('state').innerText = WORK_STATE;
        document.getElementById('timer-display').innerText = `${POMO_MINS}:00`;
        document.getElementById('reset-button').disabled = true; // disable reset button
        // remove settings warning after 4 pomos
        if(document.getElementById('total').innerText % 4 == 0) {
            document.getElementById('warning').style.display = 'none';
        }
    }
    colorChange();
    breakReminders(); 
    progressBar();     
}

/**
 * @name updateTimer
 * @function
 * @description Decrements the timer down to 0
 * @param {number} duration The total number of seconds the timer should run
 */
function updateTimer(duration) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;

    /**
     * @name timerCountdown
     * @function
     * @description Begins the timer countdown and updates the timer display
     */
    function timerCountdown() {
        // get the number of seconds that have elapsed since updateTimer() was called
        diff = duration - (((Date.now() - start) / MS) | 0);

        // truncates the float
        minutes = (diff / NUM_SEC) | 0;
        seconds = (diff % NUM_SEC) | 0;

        // add extra 0 to minutes/seconds if they are less than 10
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        document.getElementById('timer-display').innerText= 
            `${minutes}:${seconds}`;

        // stop timer when minutes and seconds reach 0
        if(minutes == 0 && seconds == 0) {
            clearInterval(timerId);

            // if curr state is work state, update the streak and total pomo count
            if(timer.currState === WORK_STATE) {                
                timer.counter.streak++;
                document.getElementById('streak').innerText = 
                    timer.counter.streak;
        
                timer.counter.totalPomos++;
                document.getElementById('total').innerText = 
                    timer.counter.totalPomos;
            } else {
                document.querySelector('#form-enabler').removeAttribute('disabled');
            }

            // enable start button when timer ends
            document.getElementById('start-button').disabled = false;
            timer.counter.stateCtr++; 

            // transition to the next state
            updateState();
            showNotif(timer.currState);
            if(document.getElementById('notif-toggle').checked) {
                playSound();
            }
        }
        if (diff <= 0) {
            // add one second so that the countdown starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    }

    timerCountdown(); // don't wait a full second before the timer starts
    timerId = setInterval(timerCountdown, 10); // fires set interval often to give time to update
}

/**
 * @name setCustomTime
 * @description Changes the times for each session based on user input
 */
function setCustomTime() {
    let wTime = document.getElementById('work-time');
    let sbTime = document.getElementById('short-break-time');
    let lbTime = document.getElementById('long-break-time');
    let warning = document.getElementById('warning');
    let wTimeOutput = document.getElementById('work-time-val');
    let sbTimeOutput = document.getElementById('short-break-time-val');
    let lbTimeOutput = document.getElementById('long-break-time-val');

    wTimeOutput.innerHTML = wTime.value;
    sbTimeOutput.innerHTML = sbTime.value;
    lbTimeOutput.innerHTML = lbTime.value;

    if(Number(wTime.value) <= Number(sbTime.value) || Number(wTime.value) <= Number(lbTime.value)) {
      // enable a warning
      warning.innerText = 'Work Periods must be greater than Break Periods';
      warning.style.display = 'block';

      // keep the drop down values the same as the current timer settings
      wTime.value = POMO_MINS.toString();
      sbTime.value = SHORT_MINS.toString();
      lbTime.value = LONG_MINS.toString();
      wTimeOutput.innerHTML = wTime.value;
      sbTimeOutput.innerHTML = sbTime.value;
      lbTimeOutput.innerHTML = lbTime.value;
      return;
  }

    // otherwise do not display a warning
    warning.style.display = 'none';

    // set the new time preferences
    POMO_MINS = Number(wTime.value);
    document.getElementById('timer-display').innerText = `${POMO_MINS}:00`;
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
    document.querySelector('#form-enabler').disabled = 'disabled';

    // enable a warning if the user tries changing the time limits during a pomo
    document.getElementById('warning').innerText = 'Wait until the end of your next break to change the times!';
    document.getElementById('warning').style.display = 'block'; 

    document.getElementById('start-button').disabled = true; // disable start button
    document.getElementById('reset-button').disabled = false; // enable reset button

    checkState();
    updateTimer(timer.currDuration); // update the timer display
}

/**
 * @name onReset
 * @function
 * @description Resets the timer to the beginning of its current state when the reset button is clicked
 */
function onReset() {
    document.getElementById('reset-button').disabled = true;
    document.getElementById('start-button').disabled = false;
    document.getElementById('warning').style.display = 'none';
    document.getElementById('form-enabler').removeAttribute('disabled');
    timer.counter.streak = 0;
    document.getElementById('streak').innerText = 
                    timer.counter.streak;
    clearInterval(timerId);
    checkState();
}

/**
 * @name revealSettings
 * @function
 * @description Opens the settings modal when the settings button is clicked
 */
function revealSettings() {
    let settingsModal = document.getElementById('settings-modal');
    settingsModal.style.display = 'block';
    let settingsBtn = document.getElementById('settings-button');
    settingsBtn.disabled = true; 
}

/**
 * @name hideSettings
 * @description Closes the settings modal when the 'x' inside the modal or anywhere outside of the modal is clicked
 */
function hideSettings() {
    let settingsModal = document.getElementById('settings-modal');
    settingsModal.style.display = 'none';
    if(document.getElementById('warning').innerText === 'Work Periods must be greater than Break Periods'){
        document.getElementById('warning').style.display = 'none';
    }
    document.getElementById('settings-button').disabled = false; 
}

/**
 * @name keyboardShortcut
 * @function
 * @description Starts and resets timer when the space bar is clicked
 * @param {*} event The keyboard button that is clicked
 */
function keyboardShortcut(event) {
    if (document.getElementById('keyboard-toggle').checked && !isCustomizingKey){
        if(event.code === startKey) {
            // if the timer is static, start timer
            if(document.getElementById('start-button').disabled == false ) {
                onStart();
            }
            // if timer is running, reset timer
            else {
                if(timer.currState === WORK_STATE) {
                    onReset();
                }
            }
        }

        if(event.code === volumeUpKey) {
            let curVol = document.getElementById('alarm-volume').value
            document.getElementById('alarm-volume').value = parseInt(curVol) + 10;
            console.log(document.getElementById('alarm-volume').value)
        }
        if(event.code === volumneDownKey) {
            let curVol = document.getElementById('alarm-volume').value
            document.getElementById('alarm-volume').value = parseInt(curVol) - 10;
            console.log(document.getElementById('alarm-volume').value)
        }

        event.preventDefault();
    }
}

/**
 * @name customizeKey
 * @description Allows for keyboard shortcuts to be customized
 */
function customizeKey() {
    // check to see which keyboard customization button was pressed
    if(document.getElementById('keyboard-toggle').checked) {
        isCustomizingKey = true;
        this.blur();
        this.innerHTML = 'Press a key';

        // take user input for key customization
        document.addEventListener('keydown', event => {
            this.innerHTML = event.code;
            isCustomizingKey = false;
            switch(this.id) {
                case 'customize-start':
                    startKey = event.code;
                    break;
                case 'customize-volume-up':
                    volumeUpKey = event.code;
                    break;
                case 'customize-volume-down':
                    volumneDownKey = event.code;
                    break;
                default:
                    this.innerHTML = 'Press a key';
            }
        }, {once: true});
    }
}

// export functions and variables for testing
export {onStart, onReset, checkState,updateState, timer, setCustomTime, 
    keyboardShortcut, revealSettings, hideSettings, customizeKey,
    SHORT_STATE, LONG_STATE, WORK_STATE, POMO_MINS, SHORT_MINS, LONG_MINS}; 