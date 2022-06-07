import { timer, WORK_STATE, SHORT_STATE, LONG_STATE } from "./timer.js";

/**
 * @name updateProgress
 * @function
 * @description update the progress bar based on current state and streak count
 */
function updateProgress() {
  let endGradient = "#fff";
  if (document.documentElement.className == "dark-theme") {
    endGradient = "#323232";
  }

  if (timer.currState == SHORT_STATE) {
    let gradientstart = (timer.counter.streak % 4) * 25 - 10;
    let gradientend = (timer.counter.streak % 4) * 25;
    document.getElementById(
      "progress-long-break"
    ).style.background = `linear-gradient(to right, #FFD24C ${gradientstart}%, ${endGradient} ${gradientend}%)`;
  } else if (timer.currState == LONG_STATE) {
    document.getElementById("progress-long-break").style.background = `#FFD24C`;
  } else if (timer.currState == WORK_STATE) {
    document.getElementById(
      "progress-long-break"
    ).style.background = `${endGradient}`;
  }
}

export { updateProgress };
