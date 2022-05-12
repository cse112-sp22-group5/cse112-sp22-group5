import { timer, WORK_STATE, SHORT_STATE, LONG_STATE } from './timer.js';

/**
 * @name colorChange
 * @function
 * @description Changes the color of the background and border of timer display when state changes
 */
function colorChange() {
  switch(timer.currState) {
    case WORK_STATE:
      document.body.setAttribute('state','pomo');
      document.getElementById('timer-display').setAttribute('state','pomo');
      document.querySelector('.progress-container').setAttribute('state','pomo');
      break;

    case SHORT_STATE:
      document.body.setAttribute('state','short');
      document.getElementById('timer-display').setAttribute('state','short');
      break;

    case LONG_STATE:
      document.body.setAttribute('state','long');
      document.getElementById('timer-display').setAttribute('state','long');
      break;
      
    default:
      document.body.setAttribute('state','pomo');
      document.getElementById('timer-display').setAttribute('state','pomo');
      break;
  }
}

// export functions for testing
export { colorChange };