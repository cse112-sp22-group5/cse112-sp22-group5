import { circles, reset } from "../../source/modules/progress-bar.js";
import { timer, WORK_STATE, updateState } from "../../source/modules/timer.js";

describe("Test progress bar", () => {
  test("all dots are active at beginning of four pomo cycle", () => {
    document.body.innerText = `
            <div class='container'>
            <div class='progress-container'>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>
            <div id='timer-display' state='pomo'>25:00</div> <!-- displays the timer countdown -->
            </div>        
        `;
    reset();
    circles.forEach((circle) => {
      expect(circle.classList.contains("deactive")).toBeFalsy();
    });
  }),
    test("first dot is deactivated after one work session is completed", () => {
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
        `;
      timer.currState = WORK_STATE;
      updateState();
      circles.forEach((circle, idx) => {
        if (idx == 0) {
          expect(circle.classList.contains("deactive")).toBeTruthy();
        } else {
          expect(circle.classList.contains("deactive")).toBeFalsy();
        }
      });
    }),
    test("second dot is deactivated after one short break session is completed", () => {
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
        `;
      timer.currState = WORK_STATE;
      updateState();
      updateState();
      circles.forEach((circle, idx) => {
        if (idx === 0 || idx === 1) {
          expect(circle.classList.contains("deactive")).toBeTruthy();
        } else {
          expect(circle.classList.contains("deactive")).toBeFalsy();
        }
      });
    });

  test("all dots are deactivated after long break is completed", () => {
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
        `;
    timer.currState = WORK_STATE;
    updateState();
    updateState();
    updateState();
    updateState();
    updateState();
    updateState();
    updateState();
    updateState(); // long break is completed
    circles.forEach((circle) => {
      expect(circle.classList.contains("deactive")).toBeTruthy();
    });
  });
});
