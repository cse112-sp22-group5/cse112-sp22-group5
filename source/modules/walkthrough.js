// import introJs from 'intro.js';
import { toggleMenu } from './side-nav-bar.js';
// var introJs = require('intro.js');
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
    intro: 'A Pomodoro Timer is a time management tool that breaks down work into intervals (pomos). The Pomodoro technique increases productivity, enhances focus while working, and can be used by anyone!',
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
    element: document.getElementById('time-customization'),
    intro: 'Customize the lengths of your work sessions, short breaks, and long breaks.',
    position: 'bottom',
    step: 6
  },
  {
    element: document.getElementById('bg-music'),
    intro: 'Want some background music while you work? Choose your tunes here.',
    position: 'bottom',
    step: 7
  },
  {
    element: document.getElementById('keyboard-shortcuts'),
    intro: 'Enable or disable keyboard shortcuts and customize keys which keys you want to use to start/restart your timer and increase/decrease volume and time.',
    position: 'bottom',
    step: 8
  },
  {
    element: document.getElementById('audio-enabler'),
    intro: 'Enable or disable the audio alarm that will go off at the end of each session and break.',
    position: 'bottom',
    step: 9
  },
  {
    element: document.getElementById('tasks-icon'),
    intro: 'Click on the task icon to access the task list panel. Add tasks that you need to work on and check them off as you complete them.',
    position: 'bottom',
    step: 10
  }];



function startWalkthrough() {
  introJs().setOptions({
    disableInteraction: false,
    showStepNumbers: true,
    steps: steps
  }).start();

  introJs().onchange(target => {
    console.log(target);
    if(this._currentStep === 6) {
        console.log('Here!');
        toggleMenu("setting-div");
    }
    
  });
}



export { startWalkthrough };