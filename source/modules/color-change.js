import { timer, WORK_STATE, SHORT_STATE, LONG_STATE } from "./timer.js";

/**
 * @name colorChange
 * @function
 * @description Changes the color of the background and border of timer display when state changes
 */
function colorChange() {
  switch (timer.currState) {
    case WORK_STATE:
      document.body.setAttribute("data-state", "pomo");
      //     document.getElementById('tasks').setAttribute('data-state','pomo');
      document
        .getElementById("timer-display")
        .setAttribute("data-state", "pomo");
      break;

    case SHORT_STATE:
      document.body.setAttribute("data-state", "short");
      //    document.getElementById('tasks').setAttribute('data-state','short');
      document
        .getElementById("timer-display")
        .setAttribute("data-state", "short");
      break;

    case LONG_STATE:
      document.body.setAttribute("data-state", "long");
      //    document.getElementById('tasks').setAttribute('data-state','long');
      document
        .getElementById("timer-display")
        .setAttribute("data-state", "long");
      break;

    default:
      document.body.setAttribute("data-state", "pomo");
      //   document.getElementById('tasks').setAttribute('data-state','pomo');
      document
        .getElementById("timer-display")
        .setAttribute("data-state", "pomo");
      break;
  }
}

// export functions for testing
export { colorChange };
