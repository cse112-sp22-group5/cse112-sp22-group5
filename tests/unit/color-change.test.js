import { colorChange } from "../../source/modules/color-change.js";
import {
  timer,
  WORK_STATE,
  SHORT_STATE,
  LONG_STATE,
} from "../../source/modules/timer.js";

beforeEach(() => {
  document.body.innerHTML = `<!DOCTYPE html>
  <html lang='en'>
  <head>
      <meta charset='UTF-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <meta name='description' content='Increase productivity with the Productoro Pomodoro timer.'>
      <link rel='stylesheet' href='styles.css'>
      <link rel="stylesheet" href="./third_party/intro.min.css">
      <link rel='icon' href='./img/tomato.ico' type='image/x-icon'/>
  
      <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
      <script type="module" src="./main.js"></script>
      
      <title>Productoro</title>
  </head>
  <body data-state='pomo'>
  
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
          <p id='break-reminder' style='color:#464646; visibility: hidden'></p>
          <p id='reminder' onload='breakReminders()' style='color:#464646; visibility: hidden'></p>  
  
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
      </div>
  
      <!-- Side bar contents-->
      <div class="sidebar-content" id="help-div">
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
                  <fieldset class='setting-flex-container' id='form-enabler'>
                      
                      <div class='setting-flex-item'>
                          <label id='work-label'>Work Session</label> 
                          <select name='work-time' id='work-time'>
                              <option id='work-option25' value='25' selected>25</option>
                              <option id='work-option30' value='30'>30</option>
                              <option id='work-option45' value='45'>45</option>
                              <option id='work-option60' value='60'>60</option>
                          </select>
                      </div>
  
                      <div class='setting-flex-item'>
                          <label id='short-break-label'>Short Break</label>
                          <select name='short-break-time' id='short-break-time'>
                          <option id='sb-option5' value='5' selected>5</option>
                          <option id='sb-option10' value='10'>10</option>
                          <option id='sb-option15' value='15'>15</option>
                          </select>
                      </div>
  
                      <div class='setting-flex-item'>
                          <label id='long-break-label'>Long Break</label>
                          <select name='long-break-time' id='long-break-time'>
                          <option id='lb-option15' value='15' selected>15</option>
                          <option id='lb-option20' value='20'>20</option>
                          <option id='lb-option25' value='25'>25</option>
                          <option id='lb-option30' value='30'>30</option>
                          </select>
                      </div>
                  </fieldset>  
      
                  <p id='notif-reminder'><strong>Remember to have system notifications enabled!</strong></p>
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
                      <audio id='background-audio' controls></audio>
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
                          <input type='range' min='0' max='100' value='100' name='alarm-volume' id='alarm-volume'>
                      </div>
  
                      <div class='setting-flex-item'>
                        <label id='alarm-sounds-label'>Alarm Sounds</label>
                        <select name='alarm-sounds' id='alarm-sounds'>
                          <option id='alarm-sound-option1' value='1' selected>Default</option>
                          <option id='alarm-sound-option2' value='2'>Sound 2</option>
                          <option id='alarm-sound-option3' value='3'>Sound 3</option>
                        </select>
                      </div>
                  </fieldset>
  
                  <h3> Multi-language </h3>
                  <div class='setting-flex-item'>
                      <label> Select your language</label>
                      <div id="google-translate-element"></div> 
                    </div>
                 
                  
              </form> 
              <div id='empty-box'></div>   
              <div class="bottom">
                  <i type="button" id="default-settings">Set to Default</i>
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
            <i type="button" id="clear-completed-tasks-button">Clear Completed Tasks</i>
            <i type="button" id="clear-tasks-button">Clear All</i>
          </div>
      </div>
  </body>
  </html>`;
});

describe(".colorChange()", () => {
  test("background color changes at short break state", () => {
    timer.currState = SHORT_STATE;
    colorChange();
    expect(document.body.getAttribute("data-state")).toBe("short");
    expect(
      document.getElementById("timer-display").getAttribute("data-state")
    ).toBe("short");
  });
  test("background color changes at long break state", () => {
    timer.currState = LONG_STATE;
    colorChange();
    expect(document.body.getAttribute("data-state")).toBe("long");
    expect(
      document.getElementById("timer-display").getAttribute("data-state")
    ).toBe("long");
  });
  test("background color changes at work state", () => {
    timer.currState = WORK_STATE;
    colorChange();
    expect(document.body.getAttribute("data-state")).toBe("pomo");
    expect(
      document.getElementById("timer-display").getAttribute("data-state")
    ).toBe("pomo");
  });
});
