function startWalkthrough() {
  introJs().setOptions({
    steps: [{
      intro: "Welcome to Productoro!"
    }, {
      element: document.getElementById('timer-display'),
      intro: "A Pomodoro Timer is a time management tool that breaks down work into intervals (pomos). Work intervals are typically 25 minutes long with five minute breaks between each interval. A longer 15 minute break occurs between every fourth and fifth interval. \n The Pomodoro technique increases productivity, enhances focus while working, and can be used by anyone!"
    }]
  }).start();
}

export { startWalkthrough };