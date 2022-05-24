import { colorChange } from "../../source/modules/color-change.js";
import {
  timer,
  WORK_STATE,
  SHORT_STATE,
  LONG_STATE,
} from "../../source/modules/timer.js";

describe("Test colorChange function", () => {
  test("changes the background color at short break state", () => {
    document.body.innerHTML = `
            <div id='timer-display' state='pomo'>25:00</div>
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
    timer.currState = SHORT_STATE;
    colorChange();
    expect(document.body.getAttribute("data-state")).toBe("short");
    expect(
      document.getElementById("timer-display").getAttribute("data-state")
    ).toBe("short");
  }),
    test("changes the background color at long break state", () => {
      document.body.innerHTML = `
            <div id='timer-display' state='pomo'>25:00</div>
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
      timer.currState = LONG_STATE;
      colorChange();
      expect(document.body.getAttribute("data-state")).toBe("long");
      expect(
        document.getElementById("timer-display").getAttribute("data-state")
      ).toBe("long");
    }),
    test("changes the background color at work state", () => {
      document.body.innerHTML = `
            <div id='timer-display' state='pomo'>25:00</div>
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
      timer.currState = WORK_STATE;
      colorChange();
      expect(document.body.getAttribute("data-state")).toBe("pomo");
      expect(
        document.getElementById("timer-display").getAttribute("data-state")
      ).toBe("pomo");
    });
});
