// import introJs from '../../node_modules/intro.js';
import { toggleMenu } from './side-nav-bar.js';
// var introJs = require('../../node_modules/intro.js');
// const intro = introJs.introJs();

var steps = [
  {
    element: document.getElementById('title'),
    intro: 'Welcome to Productoro!',
    position: 'bottom',
    step: 1
  }, 
  {
    element: document.getElementById('timer-display'),
    intro: 'A Pomodoro Timer is a time management tool that breaks down work into intervals aka pomos. The Pomodoro technique increases productivity, enhances focus while working, and can be used by anyone!',
    position: 'bottom',
    step: 2
  },
  {
    element: document.getElementById('start-button'),
    intro: 'Click \'Start\' to begin your Pomodoro timer. ',
    position: 'bottom',
    step: 3
  },
  {
    element: document.getElementById('reset-button'),
    intro: 'During a pomo, you can click \'Reset\' to restart the current pomo.',
    position: 'bottom',
    step: 4
  },
  {
    element: document.getElementById('setting-icon'),
    intro: 'Click on the settings icon to access the settings panel.',
    position: 'bottom',
    step: 5
  },
  {
    element: document.getElementById('form-enabler'),
    intro: 'Use the up and down arrows to adjust the length of your work sessions and breaks.',
    position: 'bottom',
    step: 6
  },
  {
    element: document.getElementById('bg-music-container'),
    intro: 'Want some background music while you work? Choose your tunes here.',
    position: 'top',
    step: 7
  },
  {
    element: document.getElementById('shortcut-enabler'),
    intro: 'Enable or disable keyboard shortcuts',
    position: 'top',
    step: 7
  },
  // {
  //   element: document.getElementById('shortcut-customization'),
  //   intro: 'Customize your keyboard shortcuts by clicking button next to the action you want to change and then hit the key that you want to change it to.',
  //   position: 'top',
  //   step: 8
  // },
  {
    element: document.getElementById('alarm-enabler'),
    intro: 'Change the volume or the sound of the alarm that goes off after each session.',
    position: 'top',
    step: 9
  },
  {
    element: document.getElementById('tasks-icon'),
    intro: 'Click on the task icon to access the task list panel.',
    position: 'bottom',
    step: 10
  },
  {
    element: document.getElementById('input-container'),
    intro: 'Type your tasks in here and check them off below as you complete them.',
    position: 'bottom',
    step: 11
  },
  {
    element: document.getElementById('current-task-section'),
    intro: 'Once you click on a task in the list, it will be highlighted here so you can concentrate on it without getting distracted by other tasks.',
    position: 'bottom',
    step: 12
  },
  {
    intro: 'That\'s it! You\'re ready to start a productive day!',
    position: 'bottom',
    step: 13
  }];

var introjs = introJs();

function startWalkthrough() {
  introjs.setOptions({
    disableInteraction: false,
    showStepNumbers: true,
    steps: steps
  }).start();  

  introjs.onbeforechange(() => {
    switch (introjs.currentStep()) {
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        toggleMenu('setting-div');
        break;  
      case 9:
      case 10:
        toggleMenu('tasks-div');
        break;
      default:
        toggleMenu(null);
        break;
    }
  });
}



export { startWalkthrough };