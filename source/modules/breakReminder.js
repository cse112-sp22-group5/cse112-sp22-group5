import { timer, WORK_STATE, SHORT_STATE, LONG_STATE } from "./timer.js";

/**
 * @name breakReminders
 * @function
 * @description Displays ideas for breaks during short and long break states
 */
function breakReminders() {
  let breakIdeas = [
    "Create a 5-minute stretch routine",
    "Take a short walk",
    "Do breathing exercises",
    "Do a quick 5-minute clean-up",
    "Make yourself a snack",
    "Go outside and soak in the sun",
    "Create a quick yoga routine",
    "Do some calisthenics",
    "Listen to a motivational song",
    "Juggle",
    "Work on a fun hobby",
    "Do a quick sprint",
    "Do some meal preparation",
    "Declutter your space",
    "Organize your space",
    "Take out the trash",
    "Change that lightbulb that needs changing",
    "Meditate",
    "Clean your junk drawer",
    "Do your laundry",
    "Empty or fill the dishwasher",
    "Put out bird food",
    "Water your plants",
    "Clean your glasses",
    "Go to the bathroom",
    "Do some jumping jacks",
    "Stretch your back",
    "Stretch your arms",
    "Do some push-ups",
    "Find a new podcast",
  ];

  let randomIdea = breakIdeas[Math.floor(Math.random() * breakIdeas.length)];

  document.getElementById("reminder").style.visibility = "hidden";
  document.getElementById("breakReminder").innerHTML = randomIdea;
  document.getElementById("reminder").innerHTML = "";

  switch (timer.currState) {
    case WORK_STATE:
      document.getElementById("breakReminder").innerHTML = "";
      document.getElementById("breakReminder").style.visibility = "hidden";
      document.getElementById("reminder").style.visibility = "hidden";
      break;

    case SHORT_STATE:
      document.getElementById("breakReminder").innerHTML =
        "An idea for how to spend your break:";
      document.getElementById("breakReminder").style.visibility = "visible";
      document.getElementById("reminder").style.visibility = "visible";
      document.getElementById("reminder").innerHTML = randomIdea;
      break;

    case LONG_STATE:
      document.getElementById("breakReminder").innerHTML =
        "An idea for how to spend your break:";
      document.getElementById("breakReminder").style.visibility = "visible";
      document.getElementById("reminder").style.visibility = "visible";
      document.getElementById("reminder").innerHTML = randomIdea;
      break;

    default:
      document.getElementById("breakReminder").innerHTML = "";
      document.getElementById("breakReminder").style.visibility = "hidden";
      document.getElementById("reminder").style.visibility = "hidden";
      break;
  }
}

// export functions for testing
export { breakReminders };
