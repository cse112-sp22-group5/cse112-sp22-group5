// import { doc } from "prettier";
import {
  onStart,
  onReset,
  checkState,
  updateState,
  timer,
  customizeKey,
  keyboardShortcut,
  getSetKeys,
} from "../../source/modules/timer.js";

beforeEach(() => {
  document.body.innerHTML = `<!DOCTYPE html>
  <html lang='en'>
  <head>
      <meta charset='UTF-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <meta name='description' content='Increase productivity with the Productoro Pomodoro timer.'>
      <link rel='stylesheet' href='./styles.css'>
      <link rel="stylesheet" href="./third_party/intro.min.css">
      <link rel='icon' href='./img/tomato.ico' type='image/x-icon'/>
  
      <!-- <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script> -->
      <script type="module" src="./main.js"></script>
      
      <title>Productoro</title>
  </head>
  <body data-state='pomo'>
      <div id='blur-background'></div>
      <!-- IntroJs javascript -->
      <script src="./third_party/intro.min.js"></script> 
      <header> 
          <h1 id="title">Productoro</h1>
          <nav id="options-btn-container">
              <button type=button class='help-button' id='help-button' hidden>?</button>
              <button type=button class='settings' id='settings-button' hidden>&#x2699;</button>
          </nav>
      </header>
  
      <main>
  
          <!-- Break Reminder -->
          <p id='break-reminder' style='visibility: hidden'></p>
          <p id='reminder' onload='breakReminders()' style='visibility: hidden'></p>  
  
          <!-- Current State  -->
          <h2 class='text-center' id='state' hidden>Work State</h2> 
  
          <!-- Progress Bar -->
          <section class="progress-bar">
              <div id="progress-pomo">
                  <img src="./img/icons/progress-tomato.png" alt="pomodoro time">
              </div>
              <div id="progress-break">
                  <img src="./img/icons/progress-leaf.png" alt="short break time">
              </div>
              <div id="progress-long-break">
                  <img src="./img/icons/progress-coffee.png" alt="long break time">
              </div>
          </section>
  
          <!-- Timer -->
          <div class='timer'>
              <p id="timer-display" data-state='pomo'>25:00</p>
              <p>Streak: <span id="streak">0</span></p>
              <p>Completed: <span id="total">0</span></p>
          </div>
          
          <!-- Start Reset Button -->
          <div id='start-reset'>
              <button type=button class='timer-button' id='start-button'>Start</button>
              <button type=button class='timer-button' id='reset-button' disabled>Reset</button>
          </div>
  
          <!-- Current Task -->
          <section class="current-task" id="current-task-section">
              <h2>Current Task</h2>
              <p id="current-task"></p>
          </section>
  
      </main>
      
      <footer>
          <p>Made by the <a href="../index.html">Dream Team</a></p>
          <p>Taken by the 10x Racoons</p>
      </footer>
  
      <div id="arrow-down">
          <img class="icon" src="./img/icons/arrow-down-icon.svg" alt="expand menu">
      </div>
  
      <!-- Side navigation bar -->
      <div class="side-nav-bar">
          <!-- <i class="menu-icon" id="help-icon" data-associated-div="help-div" title="help"> -->
          <i id="help-icon" data-associated-div="help-div" title="help">
              <img class="icon" src="./img/icons/question-mark.svg" >
          </i>
          <i class="menu-icon" id="setting-icon" data-associated-div="setting-div" title="setting">
              <img  class="icon" src="./img/icons/settings.svg" >
          </i>
          <i class="menu-icon" id="tasks-icon" data-associated-div="tasks-div" title="task list">
              <img  class="icon" src="./img/icons/task-list.svg" >
          </i>
  
          <i class="menu-icon" id="theme-icon" data-associated-div="theme-div" title="styles and themes">
              <img class="icon" src="./img/icons/painting-icon.svg">
          </i>
      </div>
  
      <!-- Side bar contents-->
      <div class="sidebar-content" id="help-div">
          <h2>Productoro</h2>
          <h3>What is a Pomodoro Timer?</h3>
                <p>A Pomodoro Timer is a time management tool that breaks down work into intervals (pomos).  
                    Work intervals are typically 25 minutes long with five minute breaks between each interval. 
                    A longer 15 minute break occurs between every fourth and fifth interval.</p>
                <p>The Pomodoro technique increases productivity, enhances focus while working, and can be used by anyone!</p>
                <h3>How to use Productoro:</h3>
                <ol>
                    <li>Press <b>Start</b> to begin your pomodoro timer. Your first work state will begin and the timer will begin counting down from 25 minutes.</li>
                    <li>After 25 minutes, the timer will stop, play an audio alarm will sound and transition you into your short, five minute break. The audio alarm can be disabled in settings. You must click <b>Start</b> to begin the five minute break. At the end of the break, the timer will transition back into showing a countdown from 25 minutes.</li>
                    <li>The pomos and breaks will continue to automatically transition with a long break occurring after every fourth pomo. During a pomo, <b>Reset</b> can be pressed to restart the current pomo. After pressing reset, <b>Start</b> must be pressed again to begin the countdown on the timer.</li>
                    <li>You can change the length of a break and pomo in the settings tab.</li>
                    <li>Keyboard control preferences can also be set in the settings. Simply press the spacebar while the clock is idle to start the timer. Pressing the space bar again will reset the current timer, but resetting is only allowed during a work session.</li>
                </ol>
      </div>
      <div class="sidebar-content" id="setting-div">
          <h2>Settings</h2>
              <form id='time-limits'>
                  <h3>Time (minutes)</h3>
                  <p id='warning' style='display:none'>Wait until the end of your next break to change the times!</p>     
                      
                      <fieldset id="form-enabler">
                          <div>
                              <label id="work-label">Work Session</label>
                              <input id="work-time" for="work-label" type="number" step="1" min="25" value="25">
                          </div>
  
                          <div>
                              <label id="short-break-label">Short Break</label>
                              <input id="short-break-time" for="short-break-label" type="number" min="5" value="5">
                          </div>
  
                          <div>
                              <label id="long-break-label">Long Break</label>
                              <input id="long-break-time" for="long-break-label" type="number" min="15" value="15">
                          </div>
                      </fieldset>
      
                  <h3 >Background Music</h3>
                  <fieldset class='setting-flex-container' id="bg-music-container">
                      <div class='setting-flex-item'>
                          <label for='bg-music'> Select </label>
                          <select name='bg-music' id='bg-music'>
                              <option id='bg-music-option-none' value='None' selected>None</option>
                              <option id='bg-music-option-lofi' value='Lofi'>Lofi</option>
                              <option id='bg-music-option-classical' value='Classical'>Classical</option>
                          </select>
                      </div>
                  </fieldset>
                  
                  <div id='current-mix' style='display: none;'>
                      <p id='track-name'></p>
                      <audio id='background-audio' controls>
                          Browser does not support audio element.
                      </audio>
                      <button type=button id='prev-track-button' style='position: relative;'>Prev</button>
                      <button type=button id='nxt-track-button'  style='position: relative;'>Next</button>
                  </div>
                  <h3>Shortcuts</h3>
                  <fieldset class='setting-flex-container' id="shortcut-enabler">
  
                      <div class='setting-flex-item'>
                          <label for='keyboard-toggle'>
                              <span>Keyboard Shortcuts</span>
                              <span></span>
                          </label>
                          <select name='notification' id='keyboard-toggle'>
                              <option value='on' selected>On</option>
                              <option value='off'        >Off</option>
                          </select>
                      </div>
                  </fieldset>
                  <fieldset class='setting-flex-container' id='shortcut-customization' >
                      <div class='setting-flex-item'>
                          <label for='customize-start'>Timer Start/Stop</label>
                          <button type='button' id='customize-start' >Space</button>
                      </div>
                      <div class='setting-flex-item'>
                          <label for='customize-volume-up'>Alarm Volume Up</label>
                          <button type='button' id='customize-volume-up' >ArrowUp</button>
                      </div>
                      <div class='setting-flex-item'>
                          <label for='customize-volume-down'>Alarm Volume Down</label>
                          <button type='button' id='customize-volume-down'>ArrowDown</button>
                      </div>
                  </fieldset>
                          
                  <h3> Alarm</h3>
                  <fieldset class='setting-flex-container alarm-settings' id="alarm-enabler">
                      <div class='setting-flex-item'>
                          <label for='notif-toggle'>
                              <span>Audio Alarm</span>
                              <span></span>
                            </label>
                        <select name='notification' id='notif-toggle'>
                            <option value='on' selected>On</option>
                            <option value='off'        >Off</option>
                        </select>
                      </div>
                      <div class='setting-flex-item'>
                          <label for='alarm-volume'>Alarm Volume</label>
                          <div id='range-container'>
                          <input type='range' min='0' max='100' value='50' name='alarm-volume' id='alarm-volume'>
                          </div>
                      </div>
  
                      <div class='setting-flex-item'>
                        <label id='alarm-sounds-label'>Alarm Sounds</label>
                        <select name='alarm-sounds' id='alarm-sounds'>
                          <option id='alarm-sound-option1' value='1' selected>Default</option>
                          <option id='alarm-sound-option2' value='2'>Birds</option>
                          <option id='alarm-sound-option3' value='3'>Rooster</option>
                        </select>
                      </div>
                  </fieldset>
  
                  <h3> Multi-language </h3>
                  <div class='setting-flex-item'>
                      <label> Select your language</label>
                      <div id="google-translate-element"></div> 
                    </div>
              
              <p id='notif-reminder'><strong>Remember to have system notifications enabled!</strong></p>
              
              </form> 
             
              <div class='empty-box'></div>   
              <div class="bottom">
                  <input type="button" id="default-settings" value="Set to Default">
              </div>
               
      </div>
      <div class="sidebar-content" id="tasks-div">
          <h2>Tasks</h2>
          <label for="taskName">New Task:</label>
  
          <div id="input-container">
            <input type="text" id="task-name" name="taskName" placeholder="Type in what you are working on" autocomplete="off">
            <button id="save-button">submit</button>
          </div>
  
          <label>Current Tasks:</label>
          <ul id="task-list"></ul>
          <div class="bottom">
            <input type="button" id="clear-completed-tasks-button" value="Clear Completed Tasks">
            <input type="button" id="clear-tasks-button" value="Clear All">
          </div>
      </div>
  
      <div class="sidebar-content" id="theme-div">
          <h2>Styles and Themes</h2>
          <h3>Themes</h3>
          <fieldset class='setting-flex-container'>
              <div class='setting-flex-item'>
                  <label for='theme'>Select</label>
                  <select name='theme' id='theme'>
                    <option id='theme-option1' value='1' selected>Default</option>
                    <option id='theme-option2' value='2'>Dark</option>
                    <option id='theme-option2' value='3'>Light</option>
                  </select>
                </div>
          </fieldset>
  
          <h3>Color Blindness</h3>
          <fieldset class='setting-flex-container'>
              <div class='setting-flex-item'>
                  <label for='color-blindness'>Enable Color Blindness (default themes only)</label>
                  <select name='color-blindness' id='color-blindness'>
                      <option value='4'          >On</option>
                      <option value='0' selected>Off</option>
                  </select>
                </div>
          </fieldset>
          
          <h3>Upload Your Own Image: (url only)</h3>
          <fieldset class='setting-flex-container'>
              <div class='setting-flex-item'>
                  <input type="text" id="bg-url" placeholder="URL">
                  <input type="button" id="bg-url-submit" value="submit">
                </div>
          </fieldset> 
  
          <h3>Background Images: </h3>
          <div class='setting-grid' id='background-images'></div>
          <div class='empty-box'></div>
          <div class="bottom">
              <input type="button" id="theme-default" value='Set to Default'>
          </div>
      </div>
      
  </body>
  </html>`;
});

describe(".onStart()", () => {
  test("updates state to work state", () => {
    timer.counter.stateCtr = 0;
    onStart();
    let state = document.getElementById("state").innerText;
    expect(state).toBe("Work State");
  });
  test("disables start button", () => {
    onStart();
    let disabled = document.getElementById("start-button").disabled;
    expect(disabled).toBeTruthy();
  });
  test("enables reset button", () => {
    onStart();
    let disabled = document.getElementById("reset-button").disabled;
    expect(disabled).toBeFalsy();
  });
});

describe(".onReset()", () => {
  test("resets during work state", () => {
    timer.currState = "Work State";
    onReset();
    let timerdisplay = document.getElementById("timer-display").innerText;
    let state = document.getElementById("state").innerText;
    expect(timerdisplay).toBe("25:00");
    expect(state).toBe("Work State");
  });
  test("enables start button", () => {
    onReset();
    let disabled = document.getElementById("start-button").disabled;
    expect(disabled).toBeFalsy();
  });
  test("disables reset button", () => {
    onReset();
    let disabled = document.getElementById("reset-button").disabled;
    expect(disabled).toBeTruthy();
  });
});

describe(".checkState()", () => {
  test("updates to work state", () => {
    timer.counter.totalPomos = 0;
    timer.counter.stateCtr = 0;
    checkState();
    let state = document.getElementById("state").innerText;
    expect(state).toBe("Work State");
  });
  test("updates to short break state", () => {
    timer.counter.totalPomos = 1;
    timer.counter.stateCtr = 1;
    checkState();
    let state = document.getElementById("state").innerText;
    expect(state).toBe("Short Break State");
    let disabled = document.getElementById("reset-button").disabled;
    expect(disabled).toBeTruthy();
  });
  test("updates to long break state", () => {
    timer.counter.totalPomos = 4;
    timer.counter.stateCtr = 7;
    checkState();
    let state = document.getElementById("state").innerText;
    expect(state).toBe("Long Break State");
    let disabled = document.getElementById("reset-button").disabled;
    expect(disabled).toBeTruthy();
  });
});

describe(".updateState()", () => {
  test("short break -> updates -> work state", () => {
    timer.currState = "Short Break State";
    updateState();
    let state = timer.currState;
    expect(state).toBe("Work State");
    let htmlState = document.getElementById("state").innerText;
    expect(htmlState).toBe("Work State");
    let htmlTime = document.getElementById("timer-display").innerText;
    expect(htmlTime).toBe("25:00");
    let disabled = document.getElementById("reset-button").disabled;
    expect(disabled).toBeTruthy();
  });
  test("long break -> updates -> work state", () => {
    timer.currState = "Long Break State";
    updateState();
    let state = timer.currState;
    expect(state).toBe("Work State");
    let htmlState = document.getElementById("state").innerText;
    expect(htmlState).toBe("Work State");
    let htmlTime = document.getElementById("timer-display").innerText;
    expect(htmlTime).toBe("25:00");
    let disabled = document.getElementById("reset-button").disabled;
    expect(disabled).toBeTruthy();
  });
  test("work state -> updates -> shork break", () => {
    timer.counter.totalPomos = 2;
    timer.currState = "Work State";
    updateState();
    let state = timer.currState;
    expect(state).toBe("Short Break State");
    let htmlState = document.getElementById("state").innerText;
    expect(htmlState).toBe("Short Break State");
    let htmlTime = document.getElementById("timer-display").innerText;
    expect(htmlTime).toBe("05:00");
  });
  test("work state -> updates -> long break", () => {
    timer.counter.totalPomos = 2;
    timer.currState = "Work State";
    updateState();
    let state = timer.currState;
    expect(state).toBe("Short Break State");
    let htmlState = document.getElementById("state").innerText;
    expect(htmlState).toBe("Short Break State");
    let htmlTime = document.getElementById("timer-display").innerText;
    expect(htmlTime).toBe("05:00");
  });
});

describe("Keyboard shortcut tests", () => {
  test("Check default shortcuts exist", () => {
    expect(getSetKeys()).not.toBeNull();
  }),
    test("Check default shortcuts are set", () => {
      expect(getSetKeys()).toEqual(new Set(["Space", "ArrowUp", "ArrowDown"]));
    });
  test("Check keyboard shortcut toggle", () => {
    const keyboardToggle = document.getElementById("keyboard-toggle");
    expect(keyboardToggle).toBeTruthy;
  });
  test("Check start shortcut", () => {
    keyboardShortcut(new KeyboardEvent("keydown", { code: "Space " }));
    expect(onStart).toBeCalled;
  });
  test("Check reset shortcut", () => {
    keyboardShortcut(new KeyboardEvent("keydown", { code: "Space " }));
    expect(onReset).toBeCalled;
  });
  test("Check volume up", () => {
    document.getElementById("alarm-volume").value = 50;
    const volBefore = parseInt(
      document.getElementById("alarm-volume").value,
      10
    );
    keyboardShortcut(new KeyboardEvent("keydown", { code: "ArrowUp" }));
    const volAfter = parseInt(
      document.getElementById("alarm-volume").value,
      10
    );
    expect(volAfter).toBeGreaterThan(volBefore);
  });
  test("Check volume down", () => {
    document.getElementById("alarm-volume").value = 50;
    const volBefore = parseInt(
      document.getElementById("alarm-volume").value,
      10
    );
    keyboardShortcut(new KeyboardEvent("keydown", { code: "ArrowDown" }));
    const volAfter = parseInt(
      document.getElementById("alarm-volume").value,
      10
    );
    expect(volAfter).toBeLessThan(volBefore);
  });
  test("shortcut customization", () => {
    let startShortcutBtn = document.getElementById("customize-start");
    startShortcutBtn.addEventListener("click", customizeKey);
    startShortcutBtn.click();
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyS" }));
    expect(getSetKeys()).toContain("KeyS");
  });
  test("shortcut customization but key is already in use", () => {
    let volUpShortcutBtn = document.getElementById("customize-volume-up");
    let volUpTextBefore = volUpShortcutBtn.innerHTML;
    volUpShortcutBtn.addEventListener("click", customizeKey);
    volUpShortcutBtn.click();
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }));
    let volUpTextAfter = volUpShortcutBtn.innerHTML;
    expect(volUpTextAfter).not.toEqual(volUpTextBefore);
  });
});
