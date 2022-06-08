// import { doc } from "prettier";
import {
  onStart,
  onReset,
  checkState,
  updateState,
  timer,
  //   customizeKey,
  keyboardShortcut,
  getSetKeys,
} from "../../source/modules/timer.js";

beforeEach(() => {
  document.body.innerHTML = `
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
    `;
});

describe("Test onStart function", () => {
  test("updates state to work state", () => {
    timer.counter.stateCtr = 0;
    onStart();
    let state = document.getElementById("state").innerText;
    expect(state).toBe("Work State");
  }),
    test("disables the start button", () => {
      onStart();
      let disabled = document.getElementById("start-button").disabled;
      expect(disabled).toBeTruthy();
    }),
    test("enables the reset button", () => {
      onStart();
      let disabled = document.getElementById("reset-button").disabled;
      expect(disabled).toBeFalsy();
    });
});

describe("Test onReset function", () => {
  test("resets correctly during work state", () => {
    timer.currState = "Work State";
    onReset();
    let timerdisplay = document.getElementById("timer-display").innerText;
    let state = document.getElementById("state").innerText;
    expect(timerdisplay).toBe("25:00");
    expect(state).toBe("Work State");
  }),
    test("enables the start button", () => {
      onReset();
      let disabled = document.getElementById("start-button").disabled;
      expect(disabled).toBeFalsy();
    }),
    test("disables the reset button", () => {
      onReset();
      let disabled = document.getElementById("reset-button").disabled;
      expect(disabled).toBeTruthy();
    });
});

describe("Test checkState function", () => {
  test("correctly updates to the work state", () => {
    timer.counter.totalPomos = 0;
    timer.counter.stateCtr = 0;
    checkState();
    let state = document.getElementById("state").innerText;
    expect(state).toBe("Work State");
  }),
    test("correctly updates to the short break state", () => {
      timer.counter.totalPomos = 1;
      timer.counter.stateCtr = 1;
      checkState();
      let state = document.getElementById("state").innerText;
      expect(state).toBe("Short Break State");
      let disabled = document.getElementById("reset-button").disabled;
      expect(disabled).toBeTruthy();
    }),
    test("correctly updates to the long break state", () => {
      timer.counter.totalPomos = 4;
      timer.counter.stateCtr = 7;
      checkState();
      let state = document.getElementById("state").innerText;
      expect(state).toBe("Long Break State");
      let disabled = document.getElementById("reset-button").disabled;
      expect(disabled).toBeTruthy();
    });
});

describe("Test start button", () => {
  test("calls onStart function when clicked", () => {
    document.body.innerHTML = `
            <div id = 'timer-display'>25:00</div>
            <button type=button class='timer-button' id='start-button'>Start</button>
        `;
    let startBtn = document.getElementById("start-button");
    startBtn.click();
    expect(onStart).toBeCalled;
  });
});

describe("Test reset button", () => {
  test("calls onReset function when clicked", () => {
    document.body.innerHTML = `
            <div id = 'timer-display'>25:00</div>
            <button type=button class='timer-button' id='start-button'>Start</button>
            <button type=button class='timer-button' id='reset-button'>Reset</button>
        `;
    let resetBtn = document.getElementById("reset-button");
    resetBtn.click();
    expect(onReset).toBeCalled;
  });
});

describe("Test updateState function", () => {
  test("sets state to work state if current state is short break state", () => {
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
  }),
    test("sets state to work state if current state is long break state", () => {
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
    }),
    test("sets state to short break state if current state is work state", () => {
      timer.counter.totalPomos = 2;
      timer.currState = "Work State";
      updateState();
      let state = timer.currState;
      expect(state).toBe("Short Break State");
      let htmlState = document.getElementById("state").innerText;
      expect(htmlState).toBe("Short Break State");
      let htmlTime = document.getElementById("timer-display").innerText;
      expect(htmlTime).toBe("05:00");
    }),
    test("sets state to long break state if current state is work state", () => {
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

describe("Test settings modal", () => {
  test("settings button is enabled when page loads", () => {
    const settingsBtn = document.getElementById("settings-button");
    let settingsBtnDisabled = settingsBtn.disabled;
    expect(settingsBtnDisabled).toBeFalsy;
  });

  describe("Keyboard shortcut tests", () => {
    test("Check default shortcuts exist", () => {
      expect(getSetKeys()).not.toBeNull();
    }),
      test("Check default shortcuts are set", () => {
        expect(getSetKeys()).toEqual(
          new Set(["Space", "ArrowUp", "ArrowDown"])
        );
      });
    test("Check keyboard shortcut toggle", () => {
      const keyboardToggle = document.getElementById("keyboard-toggle");
      expect(keyboardToggle).toBeTruthy;
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
  });
  // test("settings modal is hidden when page loads", () => {
  //   let settingsmodal = document.getElementById("settings-modal");
  //   let display = settingsmodal.style.display;
  //   expect(display).toBe("");
  // })
  // Modal does not work in unit testing

  // test('settings button is disabled when modal open', () => {
  //     document.body.innerHTML = `
  //         <button type=button class='settings' id='settings-button'><img id='cog' src='img/Settings_icon.png'/></button>
  //         <div id='settings-modal' class='modal'>
  //             <div class='settings-content'>
  //             <span id='close-settings'>&times;</span>
  //             </div>
  //         </div>
  //     `;
  //     revealSettings();
  //     const settingsBtn = document.getElementById('settings-button');
  //     let settingsBtnDisabled = settingsBtn.disabled;
  //     expect(settingsBtnDisabled).toBeTruthy;
  // }),

  // test('settings modal is visible when opened', () => {
  //     document.body.innerHTML = `
  //         <button type=button class='settings' id='settings-button'><img id='cog' src='img/settings-icon.png' alt='settings-icon'/></button>
  //         <div id='settings-modal' class='modal'>
  //             <div class='settings-content'>
  //             <span id='close-settings'>&times;</span>
  //             </div>
  //         </div>
  //     `;
  //     revealSettings();
  //     let settingsmodal = document.getElementById('settings-modal');
  //     let display = settingsmodal.style.display;
  //     expect(display).toBe('block');
  // }),

  // test('closing modal enables settings button', () => {
  //     document.body.innerHTML = `
  //         <button type=button class='settings' id='settings-button'><img id='cog' src='img/Settings_icon.png'/></button>
  //         <div id='settings-modal' class='modal'>
  //             <div class='settings-content'>
  //             <span id='close-settings'>&times;</span>
  //             <div id='warning' style='display:none'>Wait until the end of your next break to change the times!</div>
  //             </div>
  //         </div>
  //     `;
  //     hideSettings();
  //     const settingsBtn = document.getElementById('settings-button');
  //     let settingsBtnDisabled = settingsBtn.disabled;
  //     expect(settingsBtnDisabled).toBeFalsy;
  // }),

  // test('settings modal is hidden when closed', () => {
  //     document.body.innerHTML = `
  //         <button type=button class='settings' id='settings-button'><img id='cog' src='img/Settings_icon.png'/></button>
  //         <div id='settings-modal' class='modal'>
  //             <div class='settings-content'>
  //             <span id='close-settings'>&times;</span>
  //             <div id='warning' style='display:none'>Wait until the end of your next break to change the times!</div>
  //             </div>
  //         </div>
  //     `;
  //     revealSettings();
  //     let settingsmodal = document.getElementById('settings-modal');
  //     let display = settingsmodal.style.display;
  //     expect(display).toBe('block');

  //     hideSettings();
  //     settingsmodal = document.getElementById('settings-modal');
  //     display = settingsmodal.style.display;
  //     expect(display).toBe('none');
  // }),

  // TODO from Ethan - these 2 tests are now uneccessary since modals are no longer being used
  // keep for now in case we go back, but these can be removed eventually
  //     test("calls revealSettings function when modal is opened", () => {
  //       let settingsBtn = document.getElementById("settings-button");
  //       settingsBtn.click();
  //       expect(revealSettings).toBeCalled;
  //     }),
  //     test("calls hideSettings function when modal is closed", () => {
  //       let closesettingsBtn = document.getElementById("close-settings");
  //       closesettingsBtn.click();
  //       expect(hideSettings).toBeCalled;
  //     });
  // });

  // Modal does not work in unit testing
  // describe('Test setCustomTime function', () => {
  //     test('updates the timer display for a user\'s input', () => {
  //         document.body.innerHTML = `
  //             <div id='timer-display'>25:00</div>
  //             <h2 id='state'>Work State</h2>
  //             <button type=button class='timer-button' id='reset-button'>Reset</button>
  //             <div class='progress-container' state='pomo'>
  //                 <div class='circle pomo'></div>
  //                 <div class='circle short'></div>
  //                 <div class='circle pomo'></div>
  //                 <div class='circle short'></div>
  //                 <div class='circle pomo'></div>
  //                 <div class='circle short'></div>
  //                 <div class='circle pomo'></div>
  //                 <div class='circle long'></div>
  //             </div>
  //             <div id='warning' style='display:none'>Wait until the end of your next break to change the times!</div>
  //             <fieldset id='time-customization'>
  //                     <label id='work-label'>Select length for Work Session</label>
  //                     <select name='work-time' id='work-time'>
  //                         <option id='work-option25' value='25' selected>25</option>
  //                         <option id='work-option30' value='30'>30</option>
  //                         <option id='work-option45' value='45'>45</option>
  //                         <option id='work-option60' value='60'>60</option>
  //                     </select>
  //                     <br>

  //                     <label id='shortBreakLabel'>Select length for Short Break</label>
  //                     <select name='short-break-time' id='short-break-time'>
  //                         <option id='sb-option5'  value='5' selected>5</option>
  //                         <option id='sb-option10' value='10'>10</option>
  //                         <option id='sb-option15' value='15'>15</option>
  //                     </select>
  //                     <br>

  //                     <label id='longBreakLabel'>Select length for Long Break</label>
  //                     <select name='long-break-time' id='long-break-time'>
  //                         <option id='lb-option15' value='15' selected>15</option>
  //                         <option id='lb-option20' value='20'>20</option>
  //                         <option id='lb-option25' value='25'>25</option>
  //                         <option id='lb-option30' value='30'>30</option>
  //                     </select>
  //                     <br>
  //                 </fieldset>
  //             <div id='break-reminder' style='color:#464646;'></div>
  //             <div id='reminder' onload='breakReminders()' style='color:#464646;'></div>
  //         `;

  //         document.getElementById('work-time').selectedIndex = 1;
  //         document.getElementById('short-break-time').selectedIndex = 1;
  //         document.getElementById('long-break-time').selectedIndex = 1;
  //         setCustomTime();
  //         let htmlTime = document.getElementById('timer-display').innerText;
  //         expect(htmlTime).toBe('30:00');

  //         expect(POMO_MINS).toBe('30');
  //         expect(SHORT_MINS).toBe('10');
  //         expect(LONG_MINS).toBe('20');
  //     });
});
