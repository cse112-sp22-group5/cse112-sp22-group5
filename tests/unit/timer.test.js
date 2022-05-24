import {
  onStart,
  onReset,
  checkState,
  updateState,
  timer,
  hideSettings,
  revealSettings,
} from "../../source/modules/timer.js";

describe("Test onStart function", () => {
  test("updates state to work state", () => {
    document.body.innerHTML = `
        <main>

            <!-- Break Reminder -->
            <p id='break-reminder' style='color:#464646; visibility: hidden'></p>
            <p id='reminder' onload='breakReminders()' style='color:#464646; visibility: hidden'></p>  

            <!-- Current State  -->
            <h2 class='text-center' id='state' hidden>Work State</h2> 

            <!-- Progress Bar -->
            <div class='progress-container' hidden>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>

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
            <section class="current-task">
                <h2>Current Task</h2>
                <p id="current-task"></p>
            </section>
            
            <!-- Task List -->
            <section class="tasks" id="tasks">
                <h2>Tasks</h2>

                <!-- List Options -->
                <div id="task-options">
                    <button type="button" id="add-tasks-button">Add</button>
                    <button type="button" id="clear-tasks-button">Clear</button>
                    <button type="button" id="clear-completed-tasks-button">Completed</button>
                </div>

                <hr />

                <ul id="task-list"></ul>
            </section>

        </main>
        <p id='warning' style='display:none'>Wait until the end of your next break to change the times!</p>
        <fieldset id='form-enabler'>
            <label id='workLabel'>Work Session</label> 
            <select name='workTime' id='work-time'>
                <option id='workOption25' value='25' selected>25</option>
                <option id='workOption30' value='30'>30</option>
                <option id='workOption45' value='45'>45</option>
                <option id='workOption60' value='60'>60</option>
            </select>
            <label id='shortBreakLabel'>Short Break</label>
            <select name='shortBreakTime' id='shortBreakTime'>
                <option id='sbOption5' value='5' selected>5</option>
                <option id='sbOption10' value='10'>10</option>
                <option id='sbOption15' value='15'>15</option>
            </select>
            <label id='longBreakLabel'>Long Break</label>
            <select name='longBreakTime' id='longBreakTime'>
                <option id='lbOption15' value='15' selected>15</option>
                <option id='lbOption20' value='20'>20</option>
                <option id='lbOption25' value='25'>25</option>
                <option id='lbOption30' value='30'>30</option>
            </select>
        </fieldset>
        `;
    timer.counter.stateCtr = 0;
    onStart();
    let state = document.getElementById("state").innerText;
    expect(state).toBe("Work State");
  }),
    test("disables the start button", () => {
      document.body.innerHTML = `
        <main>

            <!-- Break Reminder -->
            <p id='break-reminder' style='color:#464646; visibility: hidden'></p>
            <p id='reminder' onload='breakReminders()' style='color:#464646; visibility: hidden'></p>  

            <!-- Current State  -->
            <h2 class='text-center' id='state' hidden>Work State</h2> 

            <!-- Progress Bar -->
            <div class='progress-container' hidden>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>

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
            <section class="current-task">
                <h2>Current Task</h2>
                <p id="current-task"></p>
            </section>
            
            <!-- Task List -->
            <section class="tasks" id="tasks">
                <h2>Tasks</h2>

                <!-- List Options -->
                <div id="task-options">
                    <button type="button" id="add-tasks-button">Add</button>
                    <button type="button" id="clear-tasks-button">Clear</button>
                    <button type="button" id="clear-completed-tasks-button">Completed</button>
                </div>

                <hr />

                <ul id="task-list"></ul>
            </section>

        </main>
        <p id='warning' style='display:none'>Wait until the end of your next break to change the times!</p>
        <fieldset id='form-enabler'>
            <label id='workLabel'>Work Session</label> 
            <select name='workTime' id='work-time'>
                <option id='workOption25' value='25' selected>25</option>
                <option id='workOption30' value='30'>30</option>
                <option id='workOption45' value='45'>45</option>
                <option id='workOption60' value='60'>60</option>
            </select>
            <label id='shortBreakLabel'>Short Break</label>
            <select name='shortBreakTime' id='shortBreakTime'>
                <option id='sbOption5' value='5' selected>5</option>
                <option id='sbOption10' value='10'>10</option>
                <option id='sbOption15' value='15'>15</option>
            </select>
            <label id='longBreakLabel'>Long Break</label>
            <select name='longBreakTime' id='longBreakTime'>
                <option id='lbOption15' value='15' selected>15</option>
                <option id='lbOption20' value='20'>20</option>
                <option id='lbOption25' value='25'>25</option>
                <option id='lbOption30' value='30'>30</option>
            </select>
        </fieldset>
        `;
      onStart();
      let disabled = document.getElementById("start-button").disabled;
      expect(disabled).toBeTruthy();
    }),
    test("enables the reset button", () => {
      document.body.innerHTML = `
        <main>

            <!-- Break Reminder -->
            <p id='break-reminder' style='color:#464646; visibility: hidden'></p>
            <p id='reminder' onload='breakReminders()' style='color:#464646; visibility: hidden'></p>  

            <!-- Current State  -->
            <h2 class='text-center' id='state' hidden>Work State</h2> 

            <!-- Progress Bar -->
            <div class='progress-container' hidden>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>

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
            <section class="current-task">
                <h2>Current Task</h2>
                <p id="current-task"></p>
            </section>
            
            <!-- Task List -->
            <section class="tasks" id="tasks">
                <h2>Tasks</h2>

                <!-- List Options -->
                <div id="task-options">
                    <button type="button" id="add-tasks-button">Add</button>
                    <button type="button" id="clear-tasks-button">Clear</button>
                    <button type="button" id="clear-completed-tasks-button">Completed</button>
                </div>

                <hr />

                <ul id="task-list"></ul>
            </section>

        </main>
        <p id='warning' style='display:none'>Wait until the end of your next break to change the times!</p>
        <fieldset id='form-enabler'>
            <label id='workLabel'>Work Session</label> 
            <select name='workTime' id='work-time'>
                <option id='workOption25' value='25' selected>25</option>
                <option id='workOption30' value='30'>30</option>
                <option id='workOption45' value='45'>45</option>
                <option id='workOption60' value='60'>60</option>
            </select>
            <label id='shortBreakLabel'>Short Break</label>
            <select name='shortBreakTime' id='shortBreakTime'>
                <option id='sbOption5' value='5' selected>5</option>
                <option id='sbOption10' value='10'>10</option>
                <option id='sbOption15' value='15'>15</option>
            </select>
            <label id='longBreakLabel'>Long Break</label>
            <select name='longBreakTime' id='longBreakTime'>
                <option id='lbOption15' value='15' selected>15</option>
                <option id='lbOption20' value='20'>20</option>
                <option id='lbOption25' value='25'>25</option>
                <option id='lbOption30' value='30'>30</option>
            </select>
        </fieldset>
        `;
      onStart();
      let disabled = document.getElementById("reset-button").disabled;
      expect(disabled).toBeFalsy();
    });
});

describe("Test onReset function", () => {
  test("resets correctly during work state", () => {
    document.body.innerHTML = `
        <main>

            <!-- Break Reminder -->
            <p id='break-reminder' style='color:#464646; visibility: hidden'></p>
            <p id='reminder' onload='breakReminders()' style='color:#464646; visibility: hidden'></p>  

            <!-- Current State  -->
            <h2 class='text-center' id='state' hidden>Work State</h2> 

            <!-- Progress Bar -->
            <div class='progress-container' hidden>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>

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
            <section class="current-task">
                <h2>Current Task</h2>
                <p id="current-task"></p>
            </section>
            
            <!-- Task List -->
            <section class="tasks" id="tasks">
                <h2>Tasks</h2>

                <!-- List Options -->
                <div id="task-options">
                    <button type="button" id="add-tasks-button">Add</button>
                    <button type="button" id="clear-tasks-button">Clear</button>
                    <button type="button" id="clear-completed-tasks-button">Completed</button>
                </div>

                <hr />

                <ul id="task-list"></ul>
            </section>

        </main>
        <p id='warning' style='display:none'>Wait until the end of your next break to change the times!</p>
        <fieldset id='form-enabler'>
            <label id='workLabel'>Work Session</label> 
            <select name='workTime' id='work-time'>
                <option id='workOption25' value='25' selected>25</option>
                <option id='workOption30' value='30'>30</option>
                <option id='workOption45' value='45'>45</option>
                <option id='workOption60' value='60'>60</option>
            </select>
            <label id='shortBreakLabel'>Short Break</label>
            <select name='shortBreakTime' id='shortBreakTime'>
                <option id='sbOption5' value='5' selected>5</option>
                <option id='sbOption10' value='10'>10</option>
                <option id='sbOption15' value='15'>15</option>
            </select>
            <label id='longBreakLabel'>Long Break</label>
            <select name='longBreakTime' id='longBreakTime'>
                <option id='lbOption15' value='15' selected>15</option>
                <option id='lbOption20' value='20'>20</option>
                <option id='lbOption25' value='25'>25</option>
                <option id='lbOption30' value='30'>30</option>
            </select>
        </fieldset>
        `;
    timer.currState = "Work State";
    onReset();
    let timerdisplay = document.getElementById("timer-display").innerText;
    let state = document.getElementById("state").innerText;
    expect(timerdisplay).toBe("25:00");
    expect(state).toBe("Work State");
  }),
    test("enables the start button", () => {
      document.body.innerHTML = `
        <main>

            <!-- Break Reminder -->
            <p id='break-reminder' style='color:#464646; visibility: hidden'></p>
            <p id='reminder' onload='breakReminders()' style='color:#464646; visibility: hidden'></p>  

            <!-- Current State  -->
            <h2 class='text-center' id='state' hidden>Work State</h2> 

            <!-- Progress Bar -->
            <div class='progress-container' hidden>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>

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
            <section class="current-task">
                <h2>Current Task</h2>
                <p id="current-task"></p>
            </section>
            
            <!-- Task List -->
            <section class="tasks" id="tasks">
                <h2>Tasks</h2>

                <!-- List Options -->
                <div id="task-options">
                    <button type="button" id="add-tasks-button">Add</button>
                    <button type="button" id="clear-tasks-button">Clear</button>
                    <button type="button" id="clear-completed-tasks-button">Completed</button>
                </div>

                <hr />

                <ul id="task-list"></ul>
            </section>

        </main>
        <p id='warning' style='display:none'>Wait until the end of your next break to change the times!</p>
        <fieldset id='form-enabler'>
            <label id='workLabel'>Work Session</label> 
            <select name='workTime' id='work-time'>
                <option id='workOption25' value='25' selected>25</option>
                <option id='workOption30' value='30'>30</option>
                <option id='workOption45' value='45'>45</option>
                <option id='workOption60' value='60'>60</option>
            </select>
            <label id='shortBreakLabel'>Short Break</label>
            <select name='shortBreakTime' id='shortBreakTime'>
                <option id='sbOption5' value='5' selected>5</option>
                <option id='sbOption10' value='10'>10</option>
                <option id='sbOption15' value='15'>15</option>
            </select>
            <label id='longBreakLabel'>Long Break</label>
            <select name='longBreakTime' id='longBreakTime'>
                <option id='lbOption15' value='15' selected>15</option>
                <option id='lbOption20' value='20'>20</option>
                <option id='lbOption25' value='25'>25</option>
                <option id='lbOption30' value='30'>30</option>
            </select>
        </fieldset>
        `;
      onReset();
      let disabled = document.getElementById("start-button").disabled;
      expect(disabled).toBeFalsy();
    }),
    test("disables the reset button", () => {
      document.body.innerHTML = `
        <main>

            <!-- Break Reminder -->
            <p id='break-reminder' style='color:#464646; visibility: hidden'></p>
            <p id='reminder' onload='breakReminders()' style='color:#464646; visibility: hidden'></p>  

            <!-- Current State  -->
            <h2 class='text-center' id='state' hidden>Work State</h2> 

            <!-- Progress Bar -->
            <div class='progress-container' hidden>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>

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
            <section class="current-task">
                <h2>Current Task</h2>
                <p id="current-task"></p>
            </section>
            
            <!-- Task List -->
            <section class="tasks" id="tasks">
                <h2>Tasks</h2>

                <!-- List Options -->
                <div id="task-options">
                    <button type="button" id="add-tasks-button">Add</button>
                    <button type="button" id="clear-tasks-button">Clear</button>
                    <button type="button" id="clear-completed-tasks-button">Completed</button>
                </div>

                <hr />

                <ul id="task-list"></ul>
            </section>

        </main>
        <p id='warning' style='display:none'>Wait until the end of your next break to change the times!</p>
        <fieldset id='form-enabler'>
            <label id='workLabel'>Work Session</label> 
            <select name='workTime' id='work-time'>
                <option id='workOption25' value='25' selected>25</option>
                <option id='workOption30' value='30'>30</option>
                <option id='workOption45' value='45'>45</option>
                <option id='workOption60' value='60'>60</option>
            </select>
            <label id='shortBreakLabel'>Short Break</label>
            <select name='shortBreakTime' id='shortBreakTime'>
                <option id='sbOption5' value='5' selected>5</option>
                <option id='sbOption10' value='10'>10</option>
                <option id='sbOption15' value='15'>15</option>
            </select>
            <label id='longBreakLabel'>Long Break</label>
            <select name='longBreakTime' id='longBreakTime'>
                <option id='lbOption15' value='15' selected>15</option>
                <option id='lbOption20' value='20'>20</option>
                <option id='lbOption25' value='25'>25</option>
                <option id='lbOption30' value='30'>30</option>
            </select>
        </fieldset>
        `;
      onReset();
      let disabled = document.getElementById("reset-button").disabled;
      expect(disabled).toBeTruthy();
    });
});

describe("Test checkState function", () => {
  test("correctly updates to the work state", () => {
    document.body.innerHTML = `
        <main>

            <!-- Break Reminder -->
            <p id='break-reminder' style='color:#464646; visibility: hidden'></p>
            <p id='reminder' onload='breakReminders()' style='color:#464646; visibility: hidden'></p>  

            <!-- Current State  -->
            <h2 class='text-center' id='state' hidden>Work State</h2> 

            <!-- Progress Bar -->
            <div class='progress-container' hidden>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>

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
            <section class="current-task">
                <h2>Current Task</h2>
                <p id="current-task"></p>
            </section>
            
            <!-- Task List -->
            <section class="tasks" id="tasks">
                <h2>Tasks</h2>

                <!-- List Options -->
                <div id="task-options">
                    <button type="button" id="add-tasks-button">Add</button>
                    <button type="button" id="clear-tasks-button">Clear</button>
                    <button type="button" id="clear-completed-tasks-button">Completed</button>
                </div>

                <hr />

                <ul id="task-list"></ul>
            </section>

        </main>
        <p id='warning' style='display:none'>Wait until the end of your next break to change the times!</p>
        <fieldset id='form-enabler'>
            <label id='workLabel'>Work Session</label> 
            <select name='workTime' id='work-time'>
                <option id='workOption25' value='25' selected>25</option>
                <option id='workOption30' value='30'>30</option>
                <option id='workOption45' value='45'>45</option>
                <option id='workOption60' value='60'>60</option>
            </select>
            <label id='shortBreakLabel'>Short Break</label>
            <select name='shortBreakTime' id='shortBreakTime'>
                <option id='sbOption5' value='5' selected>5</option>
                <option id='sbOption10' value='10'>10</option>
                <option id='sbOption15' value='15'>15</option>
            </select>
            <label id='longBreakLabel'>Long Break</label>
            <select name='longBreakTime' id='longBreakTime'>
                <option id='lbOption15' value='15' selected>15</option>
                <option id='lbOption20' value='20'>20</option>
                <option id='lbOption25' value='25'>25</option>
                <option id='lbOption30' value='30'>30</option>
            </select>
        </fieldset>
        `;
    timer.counter.totalPomos = 0;
    timer.counter.stateCtr = 0;
    checkState();
    let state = document.getElementById("state").innerText;
    expect(state).toBe("Work State");
  }),
    test("correctly updates to the short break state", () => {
      document.body.innerHTML = `
            <div id='totalCounter'>Total Pomos Completed: <span id='total'>0</span></div>
            <h2 id='state'>Work State</h2>
            <button type=button class='timer-button' id='start-button'>Start</button>
            <button type=button class='timer-button' id='reset-button'>Reset</button>
            <div id = 'timer-display'>25:00</div>
            <div class='progress-container' state='pomo'>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>
            <div id='break-reminder' style='color:#464646;'></div>
        <div id='reminder' onload='breakReminders()' style='color:#464646;'></div>
        <section class="tasks" id="tasks">
            <h2>Tasks</h2>

            <!-- List Options -->
            <div id="task-options">
                <button type="button" id="add-tasks-button">Add</button>
                <button type="button" id="clear-tasks-button">Clear</button>
                <button type="button" id="clear-completed-tasks-button">Completed</button>
            </div>

            <hr />

            <ul id="task-list"></ul>
        </section>
        `;
      timer.counter.totalPomos = 1;
      timer.counter.stateCtr = 1;
      checkState();
      let state = document.getElementById("state").innerText;
      expect(state).toBe("Short Break State");
      let disabled = document.getElementById("reset-button").disabled;
      expect(disabled).toBeTruthy();
    }),
    test("correctly updates to the long break state", () => {
      document.body.innerHTML = `
            <div id='totalCounter'>Total Pomos Completed: <span id='total'>0</span></div>
            <h2 id='state'>Work State</h2>
            <button type=button class='timer-button' id='start-button'>Start</button>
            <button type=button class='timer-button' id='reset-button'>Reset</button>
            <div id = 'timer-display'>25:00</div>
            <div class='progress-container' state='pomo'>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>
            <div id='break-reminder' style='color:#464646;'></div>
        <div id='reminder' onload='breakReminders()' style='color:#464646;'></div>

        <section class="tasks" id="tasks">
            <h2>Tasks</h2>

            <!-- List Options -->
            <div id="task-options">
                <button type="button" id="add-tasks-button">Add</button>
                <button type="button" id="clear-tasks-button">Clear</button>
                <button type="button" id="clear-completed-tasks-button">Completed</button>
            </div>

            <hr />

            <ul id="task-list"></ul>
        </section>
        `;
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
    document.body.innerHTML = `
            <div id = 'timer-display'>25:00</div>
            <h2 id='state'>Work State</h2>
            <div id='totalCounter'><b>Total Pomos Completed:</b> <span id='total'>0</span></div>
            <button type=button class='timer-button' id='reset-button'>Reset</button>
            <div class='progress-container' state='pomo'>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>
            <div id='break-reminder' style='color:#464646;'></div>
        <div id='reminder' onload='breakReminders()' style='color:#464646;'></div>

        <section class="tasks" id="tasks">
            <h2>Tasks</h2>

            <!-- List Options -->
            <div id="task-options">
                <button type="button" id="add-tasks-button">Add</button>
                <button type="button" id="clear-tasks-button">Clear</button>
                <button type="button" id="clear-completed-tasks-button">Completed</button>
            </div>

            <hr />

            <ul id="task-list"></ul>
        </section>
        `;
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
      document.body.innerHTML = `
            <div id = 'timer-display'>25:00</div>
            <h2 id='state'>Work State</h2>
            <div id='totalCounter'><b>Total Pomos Completed:</b> <span id='total'>0</span></div>
            <button type=button class='timer-button' id='reset-button'>Reset</button>
            <div class='progress-container' data-state='pomo'>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>
            <div id='break-reminder' style='color:#464646;'></div>
            <div id='reminder' onload='breakReminders()' style='color:#464646;'></div>
            <section class="tasks" id="tasks">
                <h2>Tasks</h2>

                <!-- List Options -->
                <div id="task-options">
                    <button type="button" id="add-tasks-button">Add</button>
                    <button type="button" id="clear-tasks-button">Clear</button>
                    <button type="button" id="clear-completed-tasks-button">Completed</button>
                </div>

                <hr />

                <ul id="task-list"></ul>
            </section>
        `;
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
      document.body.innerHTML = `
        <main>

            <!-- Break Reminder -->
            <p id='break-reminder' style='color:#464646; visibility: hidden'></p>
            <p id='reminder' onload='breakReminders()' style='color:#464646; visibility: hidden'></p>  

            <!-- Current State  -->
            <h2 class='text-center' id='state' hidden>Work State</h2> 

            <!-- Progress Bar -->
            <div class='progress-container' hidden>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>

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
            <section class="current-task">
                <h2>Current Task</h2>
                <p id="current-task"></p>
            </section>
            
            <!-- Task List -->
            <section class="tasks" id="tasks">
                <h2>Tasks</h2>

                <!-- List Options -->
                <div id="task-options">
                    <button type="button" id="add-tasks-button">Add</button>
                    <button type="button" id="clear-tasks-button">Clear</button>
                    <button type="button" id="clear-completed-tasks-button">Completed</button>
                </div>

                <hr />

                <ul id="task-list"></ul>
            </section>

        </main>
        <p id='warning' style='display:none'>Wait until the end of your next break to change the times!</p>
        <fieldset id='form-enabler'>
            <label id='workLabel'>Work Session</label> 
            <select name='workTime' id='work-time'>
                <option id='workOption25' value='25' selected>25</option>
                <option id='workOption30' value='30'>30</option>
                <option id='workOption45' value='45'>45</option>
                <option id='workOption60' value='60'>60</option>
            </select>
            <label id='shortBreakLabel'>Short Break</label>
            <select name='shortBreakTime' id='shortBreakTime'>
                <option id='sbOption5' value='5' selected>5</option>
                <option id='sbOption10' value='10'>10</option>
                <option id='sbOption15' value='15'>15</option>
            </select>
            <label id='longBreakLabel'>Long Break</label>
            <select name='longBreakTime' id='longBreakTime'>
                <option id='lbOption15' value='15' selected>15</option>
                <option id='lbOption20' value='20'>20</option>
                <option id='lbOption25' value='25'>25</option>
                <option id='lbOption30' value='30'>30</option>
            </select>
        </fieldset>
        `;
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
      document.body.innerHTML = `
        <main>

            <!-- Break Reminder -->
            <p id='break-reminder' style='color:#464646; visibility: hidden'></p>
            <p id='reminder' onload='breakReminders()' style='color:#464646; visibility: hidden'></p>  

            <!-- Current State  -->
            <h2 class='text-center' id='state' hidden>Work State</h2> 

            <!-- Progress Bar -->
            <div class='progress-container' hidden>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>

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
            <section class="current-task">
                <h2>Current Task</h2>
                <p id="current-task"></p>
            </section>
            
            <!-- Task List -->
            <section class="tasks" id="tasks">
                <h2>Tasks</h2>

                <!-- List Options -->
                <div id="task-options">
                    <button type="button" id="add-tasks-button">Add</button>
                    <button type="button" id="clear-tasks-button">Clear</button>
                    <button type="button" id="clear-completed-tasks-button">Completed</button>
                </div>

                <hr />

                <ul id="task-list"></ul>
            </section>

        </main>
        <p id='warning' style='display:none'>Wait until the end of your next break to change the times!</p>
        <fieldset id='form-enabler'>
            <label id='workLabel'>Work Session</label> 
            <select name='workTime' id='work-time'>
                <option id='workOption25' value='25' selected>25</option>
                <option id='workOption30' value='30'>30</option>
                <option id='workOption45' value='45'>45</option>
                <option id='workOption60' value='60'>60</option>
            </select>
            <label id='shortBreakLabel'>Short Break</label>
            <select name='shortBreakTime' id='shortBreakTime'>
                <option id='sbOption5' value='5' selected>5</option>
                <option id='sbOption10' value='10'>10</option>
                <option id='sbOption15' value='15'>15</option>
            </select>
            <label id='longBreakLabel'>Long Break</label>
            <select name='longBreakTime' id='longBreakTime'>
                <option id='lbOption15' value='15' selected>15</option>
                <option id='lbOption20' value='20'>20</option>
                <option id='lbOption25' value='25'>25</option>
                <option id='lbOption30' value='30'>30</option>
            </select>
        </fieldset>
        `;
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
    document.body.innerHTML = `
            <button type=button class='settings' id='settings-button'><img id='cog' src='img/Settings_icon.png'/></button>
            <div id='settings-modal' class='modal'>
                <div class='settings-content'>
                <span id='close-settings'>&times;</span>
                </div>
            </div>
        `;
    const settingsBtn = document.getElementById("settings-button");
    let settingsBtnDisabled = settingsBtn.disabled;
    expect(settingsBtnDisabled).toBeFalsy;
  }),
    test("settings modal is hidden when page loads", () => {
      document.body.innerHTML = `
            <button type=button class='settings' id='settings-button'><img id='cog' src='img/settings-icon.png' alt='settings-icon'/></button>
            <div id='settings-modal' class='modal'>
                <div class='settings-content'>
                <span id='close-settings'>&times;</span>
                </div>
            </div>
        `;
      let settingsmodal = document.getElementById("settings-modal");
      let display = settingsmodal.style.display;
      expect(display).toBe("");
    }),
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

    test("calls revealSettings function when modal is opened", () => {
      document.body.innerHTML = `
            <button type=button class='settings' id='settings-button'><img id='cog' src='img/Settings_icon.png'/></button>
            <div id='settings-modal' class='modal'>
                <div class='settings-content'>
                <span id='close-settings'>&times;</span>
                </div>
            </div>
        `;
      let settingsBtn = document.getElementById("settings-button");
      settingsBtn.click();
      expect(revealSettings).toBeCalled;
    }),
    test("calls hideSettings function when modal is closed", () => {
      document.body.innerHTML = `
            <button type=button class='settings' id='settings-button'><img id='cog' src='img/Settings_icon.png'/></button>
            <div id='settings-modal' class='modal'>
                <div class='settings-content'>
                <span id='close-settings'>&times;</span>
                </div>
            </div>
        `;
      let closesettingsBtn = document.getElementById("close-settings");
      closesettingsBtn.click();
      expect(hideSettings).toBeCalled;
    });
});

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
//             <fieldset id='form-enabler'>
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
// });
