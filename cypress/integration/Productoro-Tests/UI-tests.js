import { getAlarm } from '../../../source/notifications';

//Inital No Actvity Tests
describe('Fresh Entry, No Activity Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Timer Display at 25 minutes', () => {
    cy.get('#timerDisplay').should('have.text','25:00');
  });

  it('Start Button avialable', () => {
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    })
  });

  it('Reset Button not avialable', () => {
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
  });

  it('Initial State Label', () => {
    cy.get('#state').should('have.text','Work State');
  });

  it('Initial Pomo Counters', () => {
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','0');
  });

  it('Help Not displayed', () => {
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Settings Not displayed', () => {
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Initial Background Color: Blue', () => {
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Break Reminders Disabled Onload', () => {
    cy.get('#breakReminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Progress Bar Fully Lit', () =>{
    cy.get('.circle.pomo').should('have.length', 4);
    cy.get('.circle.short').should('have.length', 3);
    cy.get('.circle.long').should('have.length', 1);
  });


  it('Audio Alarm: Initally On', () => {
    cy.get('#notifToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });

  it('Keyboard Shortcuts: Initally On', () => {
    cy.get('#keyboardToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });
});




//Start Button Tests
describe('Start Button Tests', () => {
    beforeEach(() => {
      cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
    });

    it('Start Button Clicked: Check Timer Display 24:50', () => {
      cy.get('#startButton').click();
      //Cypress will wait a 10 seconds after the click
      cy.wait(10000);
      cy.get('#timerDisplay').should('have.text','24:50');
    });

    it('Start Button Clicked: Check Start Button Gets Disabled', () => {
      cy.get('#startButton').click();
      //Cypress will wait a second after the click
      cy.get('#startButton').then(($el) => {
        expect($el).to.have.attr('disabled');
      })
    });

    it('Start Button Clicked: Check Reset Button Gets Enabled', () => {
      cy.get('#startButton').click();
      //Cypress will wait a second after the click
      cy.get('#resetButton').then(($el) => {
        expect($el).to.not.have.attr('disabled');
      })
    });

    it('Start Button Clicked: Check Counters Not Updated', () => {
      cy.get('#startButton').click();
      //Cypress will wait 5 seconds after the click
      cy.wait(5000)
      cy.get('#streak').should('have.text','0');
      cy.get('#total').should('have.text','0');
    });

    it('Start Button Clicked: Check State is Work State', () => {
      cy.get('#startButton').click();
      cy.get('#state').should('have.text','Work State');
    });

    it('Start Button Clicked: Check Help Not displayed', () => {
      cy.get('#startButton').click();
      cy.get('#helpModal').then(($el) => {
        expect($el).to.be.hidden
      });
    });
  
    it('Start Button Clicked: Check Background Color Unaffected', () => {
      cy.get('#startButton').click();
      cy.get('body').then(($el) => {
        expect($el).to.have.attr('state', 'pomo');
      });
    });

    it('Start Button Clicked: Check Break Reminders Still Disabled', () => {
      cy.get('#startButton').click();
      cy.get('#breakReminder').should('have.text', '');
      cy.get('#reminder').then(($el) => {
        expect($el).to.be.hidden;
      });
    });

    it('Start Button Clicked: Progress Bar Still Fully Lit', () =>{
      cy.get('#startButton').click();
      cy.get('.circle.pomo').should('have.length', 4);
      cy.get('.circle.short').should('have.length', 3);
      cy.get('.circle.long').should('have.length', 1);
    });

    it('Start Button Clicked: Settings Not displayed', () => {
      cy.get('#startButton').click();
      cy.get('#settingsModal').then(($el) => {
        expect($el).to.be.hidden
      });
    });

    it('Start Button Clicked: Audio Alarm Still On', () => {
      cy.get('#startButton').click();
      cy.get('#notifToggle').then(($el) => {
        expect($el).to.have.prop('checked');
      });
    });
  
    it('Start Button Clicked: Keyboard Shortcuts Still On', () => {
      cy.get('#startButton').click();
      cy.get('#keyboardToggle').then(($el) => {
        expect($el).to.have.prop('checked');
      });
    });

});






describe('Reset Button Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Reset Button Clicked: Timer Display Resets', () => {
    cy.get('#startButton').click();
    //Cypress will wait a 10 seconds after the click
    cy.wait(10000);
    cy.get('#timerDisplay').should('have.text','24:50');
    cy.get('#resetButton').click();
    cy.get('#timerDisplay').should('have.text','25:00');
  });

  it('Reset Button Clicked: Check Reset Button Gets Disabled', () => {
    cy.get('#startButton').click();
    cy.get('#resetButton').click();
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
  });

  it('Reset Button Clicked: Check Start Button Gets Enabled', () => {
    cy.get('#startButton').click();
    cy.get('#resetButton').click();
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
  });

  it('Reset Button Clicked: Check Only Streak was Killed', () => {
    cy.get('#startButton').click();
    //Cypress will wait 5 seconds after the click
    cy.wait(5000)
    //Not sure if this is the right way to set the inner html
    cy.get('#streak').invoke('prop', 'innerHTML', '1');
    cy.get('#total').invoke('prop', 'innerHTML', '1');
    cy.get('#streak').should('have.text','1');
    cy.get('#total').should('have.text','1');
    cy.wait(5000);

    //check only streak gets reset
    cy.get('#resetButton').click();
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','1');
  });

  it('Reset Button Clicked: Check State is Work State', () => {
    cy.get('#startButton').click();
    cy.get('#resetButton').click();
    cy.get('#state').should('have.text','Work State');
  });

  it('Reset Button Clicked: Help Not displayed', () => {
    cy.get('#startButton').click();
    cy.get('#resetButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Reset Button Clicked: Check Background Color Unaffected', () => {
    cy.get('#startButton').click();
    cy.get('#resetButton').click();
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Reset Button Clicked: Check Break Reminders still Disabled', () => {
    cy.get('#startButton').click();
    cy.get('#breakReminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });

    cy.wait(1000*3);
    cy.get('#resetButton').click();
    cy.get('#breakReminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Reset Button Clicked: Progress Bar Still Fully Lit', () =>{
    cy.get('#startButton').click();
    cy.get('#resetButton').click();
    cy.get('.circle.pomo').should('have.length', 4);
    cy.get('.circle.short').should('have.length', 3);
    cy.get('.circle.long').should('have.length', 1);
  });

  it('Reset Button Clicked: Settings Not displayed', () => {
    cy.get('#startButton').click();
    cy.wait(1000);
    cy.get('#resetButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Reset Button Clicked: Audio Alarm Still On', () => {
    cy.get('#startButton').click();
    cy.wait(1000);
    cy.get('#resetButton').click();
    cy.get('#notifToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });

  it('Reset Button Clicked: Keyboard Shortcuts Still On', () => {
    cy.get('#startButton').click();
    cy.wait(1000);
    cy.get('#resetButton').click();
    cy.get('#keyboardToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });
});








describe('Counters Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');

    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds
  });

  it('Counters: Streak and Total at 2 After 2 Pomos', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    cy.get('#streak').should('have.text','2');
    cy.get('#total').should('have.text','2');
  });

  it('Counters: Streak and Total at 4 After 4 Pomos', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);
    
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    cy.get('#streak').should('have.text','4');
    cy.get('#total').should('have.text','4');
  });

  it('Counters: Streak 0 and Total at 1 After Reset at Second Pomo', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    cy.get('#resetButton').click();

    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','1');
  });

  it('Counters: Streak 2 and Total at 3 After Reset at Second Pomo', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //reset pomo
    cy.get('#resetButton').click();

    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','1');

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    cy.get('#streak').should('have.text','2');
    cy.get('#total').should('have.text','3');
  });
});










describe('State Label and Timer Display Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');

    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds
  });

  it('State Label and Display: Label On Work State and Display on 00:04 After 5 Seconds', () => {
    //press start
    cy.get('#startButton').click();
    cy.wait(5000);

    //check display
    cy.get('#timerDisplay').should('have.text','00:04');
    //check state
    cy.get('#state').should('have.text','Work State');
  });

  it('State Label and Display: Label On Work State and Display on 00:09 After Reset', () => {
    //press start
    cy.get('#startButton').click();
    cy.wait(1000);
    cy.get('#resetButton').click();

    //check state
    cy.get('#state').should('have.text','Work State');
    //since we manipulated the dom to input a fraction of a minute we expect the weird frozen display
    //check display
    cy.get('#timerDisplay').should('have.text','.15:00');

    //press start to get the display back to a normal form
    cy.get('#startButton').click();
    //check display
    cy.get('#timerDisplay').should('have.text','00:09');

    cy.wait(2000);
    //check display after 2 seconds
    cy.get('#timerDisplay').should('have.text','00:07');
    
  });

  it('State Label and Display: Label On Short Break State and Display on 00:06 After Pomo', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //check state
    cy.get('#state').should('have.text','Short Break State');
    //since we manipulated the dom to input a fraction of a minute we expect the weird frozen display
    //check display
    cy.get('#timerDisplay').should('have.text','0.1:00');

    //press start to get the display back to a normal form
    cy.get('#startButton').click();
    //check display
    cy.get('#timerDisplay').should('have.text','00:06');

    cy.wait(2000);
    //check display after 2 seconds
    cy.get('#timerDisplay').should('have.text','00:04');
  });

  it('State Label and Display: Label On Work State and Display on 00:09 After Break', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //check state
    cy.get('#state').should('have.text','Work State');
    //since we manipulated the dom to input a fraction of a minute we expect the weird frozen display
    //check display
    cy.get('#timerDisplay').should('have.text','.15:00');

    //press start to get the display back to a normal form
    cy.get('#startButton').click();
    //check display
    cy.get('#timerDisplay').should('have.text','00:09');

    cy.wait(2000);
    //check display after 2 seconds
    cy.get('#timerDisplay').should('have.text','00:07');
  });

  it('State Label and Display: Label On LB State and Display on 00:06 After 4 Pomos', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    

    //check state
    cy.get('#state').should('have.text','Long Break State');
    //since we manipulated the dom to input a fraction of a minute we expect the weird frozen display
    //check display
    cy.get('#timerDisplay').should('have.text','.1:00');

    //press start to get the display back to a normal form
    cy.get('#startButton').click();
    //check display
    cy.get('#timerDisplay').should('have.text','00:06');

    cy.wait(2000);
    //check display after 2 seconds
    cy.get('#timerDisplay').should('have.text','00:04');
  });

  it('State Label and Display: Label On Work State and Display on 00:09 After LB', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //check state
    cy.get('#state').should('have.text','Work State');
    //since we manipulated the dom to input a fraction of a minute we expect the weird frozen display
    //check display
    cy.get('#timerDisplay').should('have.text','.15:00');

    //press start to get the display back to a normal form
    cy.get('#startButton').click();
    //check display
    cy.get('#timerDisplay').should('have.text','00:09');

    cy.wait(2000);
    //check display after 2 seconds
    cy.get('#timerDisplay').should('have.text','00:07');
  });
});











describe('Background Color Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');

    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds
  });

  it('Background Color: Orange at Short Break', () => {
    cy.get('#startButton').click();
    //Complete the pomo
    cy.wait(9*1000);

    //check background is orange
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'short');
    });

  });

  it('Background Color: Blue after Short Break', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //now in work state
    //check background is orange
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Background Color: Green at Long Break', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //now in long break state
    //check background is green
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'long');
    });
  });

  it('Background Color: Blue after Long Break', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start Long break
    cy.get('#startButton').click();
    //finish Long break
    cy.wait(6*1000);
    
    //now in long break state
    //check background is blue
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });
});











describe('Help Button Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Help Button Clicked: Instructions Appear', () => {
    cy.get('#helpButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
  });

  it('Help Button Clicked: Timer Display Does not Start', () => {
    cy.get('#helpButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#timerDisplay').should('have.text','25:00');
  });

  it('Help Button Clicked: Start Button Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
  });

  it('Help Button Clicked: Reset Button Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
  });

  it('Help Button Clicked: Background Color Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Help Button Clicked: Current State Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#state').should('have.text','Work State');
  });

  it('Help Button Clicked: Counters Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','0');
  });

  it('Help Button Clicked: Check Break Reminders Still Disabled', () => {
    cy.get('#helpButton').click();
    cy.get('#breakReminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Help Button Clicked: Settings not Displayed', () => {
    cy.get('#helpButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Help Button Clicked: Progress Bar Still Fully Lit', () =>{
    cy.get('#helpButton').click();
    cy.get('.circle.pomo').should('have.length', 4);
    cy.get('.circle.short').should('have.length', 3);
    cy.get('.circle.long').should('have.length', 1);
  });

  it('Help Button Clicked: Audio Alarm Still On', () => {
    cy.get('#helpButton').click();
    cy.get('#notifToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });

  it('Help Button Clicked: Keyboard Shortcuts Still On', () => {
    cy.get('#helpButton').click();
    cy.get('#keyboardToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });

});













describe('Break Reminders Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');

    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds
  });

  it('Break Reminders: Check Enabled After Pomo', () => {
    cy.get('#startButton').click();
    //Complete the pomo

    cy.wait(9*1000);
    cy.get('#breakReminder').then(($el) => {
      expect($el).not.to.be.hidden;
    });
    cy.get('#breakReminder').should('not.be.empty');

    cy.get('#reminder').then(($el) => {
      expect($el).not.to.be.hidden;
    });
    cy.get('#reminder').should('not.be.empty');
  });

  it('Break Reminders: Check Disabled at New Pomo', () => {
    cy.get('#startButton').click();

    //finish pomo
    cy.wait(9*1000);
    //will fail rn but will work after fix
    cy.get('#breakReminder').then(($el) => {
      expect($el).not.to.be.hidden;
    });
    cy.get('#breakReminder').should('not.be.empty');

    cy.get('#reminder').then(($el) => {
      expect($el).not.to.be.hidden;
    });
    cy.get('#reminder').should('not.be.empty');

    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //now in work state
    cy.get('#breakReminder').then(($el) => {
      expect($el).to.be.hidden;
    });
    cy.get('#breakReminder').should('not.be.empty');

    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Break Reminders: Check Enabled at Long Break', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //now in long break state
    cy.get('#breakReminder').then(($el) => {
      expect($el).not.to.be.hidden;
    });
    cy.get('#breakReminder').should('not.be.empty');

    cy.get('#reminder').then(($el) => {
      expect($el).not.to.be.hidden;
    });
  });

  it('Break Reminders: Check Disabled after Long Break', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start Long break
    cy.get('#startButton').click();
    //finish Long break
    cy.wait(6*1000);
    
    //now in long break state
    cy.get('#breakReminder').then(($el) => {
      expect($el).to.be.hidden;
    });
    cy.get('#breakReminder').should('not.be.empty');

    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });
});

















describe('KeyBoard Shortcut: Using Space to Start Button', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Space Used as Start Button: Check Timer Display 24:50', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    //Cypress will wait a 10 seconds after the click
    cy.wait(10000);
    cy.get('#timerDisplay').should('have.text','24:50');
  });

  it('Space Used as Start Button: Check Start Button Gets Disabled', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    //Cypress will wait a second after the click
    cy.get('#startButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
  });

  it('Space Used as Start Button: Check Reset Button Gets Enabled', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    //Cypress will wait a second after the click
    cy.get('#resetButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    })
  });

  it('Space Used as Start Button: Check Counters Not Updated', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    //Cypress will wait 5 seconds after the click
    cy.wait(5000)
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','0');
  });

  it('Space Used as Start Button: Check State is Work State', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    //States need to be more consistent ... sometimes they have mode as a suffix sometimes not
    cy.get('#state').should('have.text','Work State');
  });

  it('Space Used as Start Button: Check Help Not displayed', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Space Used as Start Button: Check Background Color Unaffected', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Space Used as Start Button: Check Break Reminders Still Disabled', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#breakReminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Space Used as Start Button: Progress Bar Still Fully Lit', () =>{
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('.circle.pomo').should('have.length', 4);
    cy.get('.circle.short').should('have.length', 3);
    cy.get('.circle.long').should('have.length', 1);
  });

  it('Space Used as Start Button: Audio Alarm Still On', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#notifToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });

  it('Space Used as Start Button: Keyboard Shortcuts Still On', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#keyboardToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });

  it('Space Used as Start Button: Settings not Displayed', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.hidden;
    });
  });
});
















describe('Keyboard Shortcut: Using Space as Reset Button', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Space Used as Reset Button: Timer Display Resets', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    //Cypress will wait a 10 seconds after the click
    cy.wait(10000);
    cy.get('#timerDisplay').should('have.text','24:50');
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#timerDisplay').should('have.text','25:00');
  });

  it('Space Used as Reset Button: Check Reset Button Gets Disabled', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
  });

  it('Space Used as Reset Button: Check Start Button Gets Enabled', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
  });

  it('Space Used as Reset Button: Check Only Streak was Killed', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    //Cypress will wait 5 seconds after the click
    cy.wait(5000)
    //set the inner html to simulate pomos passed
    cy.get('#streak').invoke('prop', 'innerHTML', '3');
    cy.get('#total').invoke('prop', 'innerHTML', '3');
    cy.get('#streak').should('have.text','3');
    cy.get('#total').should('have.text','3');
    cy.wait(5000);
    //reset
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','3');
  });

  it('Space Used as Reset Button: Check State is Work State', () => {
    //start
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    //reset
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#state').should('have.text','Work State');
  });

  it('Space Used as Reset Button: Help Not displayed', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Space Used as Reset Button: Check Background Color Unaffected', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Space Used as Reset Button: Check Break Reminders still Disabled', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#breakReminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });

    cy.wait(1000*3);
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#breakReminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Space Used as Reset Button: Check Progress Bar Still Fully Lit', () =>{
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('.circle.pomo').should('have.length', 4);
    cy.get('.circle.short').should('have.length', 3);
    cy.get('.circle.long').should('have.length', 1);
  });

  it('Space Used as Reset Button: Check Audio Alarm Still On', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#notifToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });

  it('Space Used as Reset Button: Check Keyboard Shortcuts Still On', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#keyboardToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });

  it('Space Used as Reset Button: Check Settings not Displayed', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.hidden;
    });
  });
});














describe('Settings Button Tests (Pressibility)', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Settings Button Clicked: Settings Appear', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
  });

  it('Settings Button Clicked: Timer Display Does not Start', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#timerDisplay').should('have.text','25:00');
  });

  it('Settings Button Clicked: Start Button Unaffected', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
  });

  it('Settings Button Clicked: Reset Button Unaffected', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
  });

  it('Settings Button Clicked: Background Color Unaffected', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Settings Button Clicked: Current State Unaffected', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#state').should('have.text','Work State');
  });

  it('Settings Button Clicked: Counters Unaffected', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','0');
  });

  it('Settings Button Clicked: Check Break Reminders Still Disabled', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });

    cy.get('#breakReminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Settings Button Clicked: Help Moal not Displayed', () => {
    cy.get('#settingsButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Settings Button Clicked: Check Progress Bar Still Fully Lit', () =>{
    cy.get('#settingsButton').click();
    cy.get('.circle.pomo').should('have.length', 4);
    cy.get('.circle.short').should('have.length', 3);
    cy.get('.circle.long').should('have.length', 1);
  });

  it('Settings Button Clicked: Check Audio Alarm Still On', () => {
    cy.get('#settingsButton').click();
    cy.get('#notifToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });

  it('Settings Button Clicked: Check Keyboard Shortcuts Still On', () => {
    cy.get('#settingsButton').click();
    cy.get('#keyboardToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });
});



















describe('Custom Time Limits', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');

    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds

    //Dont need to check if help gets displayed since we are in settings 
    //Dont need to check if settings gets displayed when we change the limits since it already is
    //Will not test timer display independently but integrated with other tests
  });

  it('Custom Time Limits: Set and Test New Times and Ensure Timer and Display is reflected', () => {
    cy.get('#state').should('have.text','Work State');
    //display is what ever the custom time is with :00 appended at the end 
    //no leading 0 since the pomo without maniplulation is always >= 10 
    cy.get('#timerDisplay').should('have.text','.15:00');
    cy.get('#startButton').click();
    //Cypress will wait a 9 seconds to finish pomo
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Short Break State');
    //display is what ever the custom time is with :00 appended at the end and extra 0 appened since < 10
    cy.get('#timerDisplay').should('have.text','0.1:00');
    cy.get('#startButton').click();
    //Cypress will wait a 9 seconds to finish break
    cy.wait(6*1000);

    //repeat 3 more times
    //2nd Pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timerDisplay').should('have.text','.15:00');
    cy.get('#startButton').click();
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Short Break State');
    cy.get('#timerDisplay').should('have.text','0.1:00');
    cy.get('#startButton').click();
    cy.wait(6*1000);

    //3rd Pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timerDisplay').should('have.text','.15:00');
    cy.get('#startButton').click();
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Short Break State');
    cy.get('#timerDisplay').should('have.text','0.1:00');
    cy.get('#startButton').click();
    cy.wait(6*1000);

    //4th Pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timerDisplay').should('have.text','.15:00');
    cy.get('#startButton').click();
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Long Break State');
    //display is what ever the custom time is with :00 appended at the end 
    //no leading 0 since in real code we are assure LB > 10 
    cy.get('#timerDisplay').should('have.text','.1:00');
    cy.get('#startButton').click();
    cy.wait(6*1000);

    //Back to first pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timerDisplay').should('have.text','.15:00');
  });

  it('Custom Time Limits: Test Invalid Options Change Nothing', () => {
    //Current
    //Pomo: 9 Seconds Out of: [.15,25,30,45]
    //SB: 6 seconds Out of: [.1,5,10]
    //LB: 6 seconds Out of: [.1,20,25,30]

    cy.get('#settingsButton').click();
    //try to set these times but times will not actually change
    cy.get('#shortBreakTime').select('5');
    cy.get('#longBreakTime').select('20');

    //Check that the text didnt change
    cy.get('#workOption60').then(($el) => {
      expect($el).to.have.prop('selected', true);
    });
    cy.get('#sbOption15').then(($el) => {
      expect($el).to.have.prop('selected', true);
    });
    cy.get('#lbOption15').then(($el) => {
      expect($el).to.have.prop('selected', true);
    });

    cy.get('#closeSettings').click();

    //repeat previous tests
    cy.get('#state').should('have.text','Work State');
    cy.get('#timerDisplay').should('have.text','.15:00');
    cy.get('#startButton').click();
    //Cypress will wait a 9 seconds to finish pomo
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Short Break State');
    cy.get('#timerDisplay').should('have.text','0.1:00');
    cy.get('#startButton').click();
    //Cypress will wait a 9 seconds to finish break
    cy.wait(6*1000);

    //repeat 3 more times
    //2nd Pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timerDisplay').should('have.text','.15:00');
    cy.get('#startButton').click();
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Short Break State');
    cy.get('#timerDisplay').should('have.text','0.1:00');
    cy.get('#startButton').click();
    cy.wait(6*1000);

    //3rd Pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timerDisplay').should('have.text','.15:00');
    cy.get('#startButton').click();
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Short Break State');
    cy.get('#timerDisplay').should('have.text','0.1:00');
    cy.get('#startButton').click();
    cy.wait(6*1000);

    //4th Pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timerDisplay').should('have.text','.15:00');
    cy.get('#startButton').click();
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Long Break State');
    //display is what ever the custom time is with :00 appended at the end 
    //no leading 0 since in real code we are assure LB > 10 
    cy.get('#timerDisplay').should('have.text','.1:00');
    cy.get('#startButton').click();
    cy.wait(6*1000);

    //Back to first pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timerDisplay').should('have.text','.15:00');
  });

  it('Custom Time Limits: Check Start Button avialable', () => {
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    })
  });

  it('Custom Time Limits: Check Reset Button not avialable', () => {
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
  });

  it('Custom Time Limits: Check Initial State Label', () => {
    cy.get('#state').should('have.text','Work State');
  });

  it('Custom Time Limits: Check Initial Pomo Counters', () => {
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','0');
  });
  

  it('Custom Time Limits: Check Initial Background Color: Blue', () => {
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Custom Time Limits: Check Break Reminders Disabled Onload', () => {
    cy.get('#breakReminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Custom Time Limits: Check Progress Bar Fully Lit', () =>{
    cy.get('.circle.pomo').should('have.length', 4);
    cy.get('.circle.short').should('have.length', 3);
    cy.get('.circle.long').should('have.length', 1);
  });


  it('Custom Time Limits: Check Audio Alarm Initally On', () => {
    cy.get('#notifToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });

  it('Custom Time Limits: Check Keyboard Shortcuts Initally On', () => {
    cy.get('#keyboardToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });
});















describe('Warning Messages Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Warning Message: Check Warning When Timer is Running', () => {
    cy.get('#startButton').click();
    cy.get('#settingsButton').click();
    //checks displayed
    cy.get('#warning').then(($el) => {
      expect($el).to.not.be.hidden;
    });
    //checks correct message
    cy.get('#warning').should('have.text', 'Wait until the end of your next break to change the times!');
    cy.get('#closeSettings').click();

    //repeat a few times to check persistence
    cy.get('#settingsButton').click();
    cy.get('#warning').then(($el) => {
      expect($el).to.not.be.hidden;
    });
    cy.get('#warning').should('have.text', 'Wait until the end of your next break to change the times!');
    cy.get('#closeSettings').click();


    cy.get('#settingsButton').click();
    cy.get('#warning').then(($el) => {
      expect($el).to.not.be.hidden;
    });
    cy.get('#warning').should('have.text', 'Wait until the end of your next break to change the times!');
    cy.get('#closeSettings').click();
  });

  it('Warning Message: Check Warning When Input Invalid Time', () => {
    // Current Pomo: 25 min
    // Current SB : 5 mim
    // Current LB: 15 min
    //INPUT INVALID LB TIME
    cy.get('#settingsButton').click();
    cy.get('#longBreakTime').select('30');
    
    

    //checks displayed
    cy.get('#warning').then(($el) => {
      expect($el).to.not.be.hidden;
    });
    //checks correct message
    cy.get('#warning').should('have.text', 'Work Periods must be greater than Break Periods');
  });

  it('Warning Message: Check Timer Warning Disappears After Reset', () => {
    cy.get('#startButton').click();
    cy.get('#settingsButton').click();
    //Warning will appear as seen in last tests
    cy.get('#closeSettings').click();
    //hit reset
    cy.get('#resetButton').click();

    cy.get('#settingsButton').click();
    //checks not displayed
    cy.get('#warning').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Warning Message: Check Invalid Times Warning Disappears After Closing', () => {
    // Current Pomo: 25 min
    // Current SB : 5 mim
    // Current LB: 15 min
    //INPUT INVALID TIME
    cy.get('#settingsButton').click();
    cy.get('#longBreakTime').select('30');
    //Warning will appear as seen in last tests
    cy.get('#closeSettings').click();
    
    //Reopen Settings
    cy.get('#settingsButton').click();
    //checks not displayed
    cy.get('#warning').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Warning Message: Check Invalid Times Warning Disappears After Putting Valid Time', () => {
    // Current Pomo: 25 min
    // Current SB : 5 mim
    // Current LB: 15 min
    //INPUT INVALID TIME
    cy.get('#settingsButton').click();
    cy.get('#longBreakTime').select('30');
    //Warning will appear as seen in last tests
    
    //Input Valid Time
    cy.get('#workTime').select('45');
    cy.get('#warning').then(($el) => {
      expect($el).to.be.hidden;
    });
  });
});
















describe('Banner Notifications Tests', () => {
  //Will get warnings but they are expected. The test will pass
  it('Banner Notif Test: Permission Granted, Check Banner Appears at the End of Every State', () => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html', {
      onBeforeLoad (win) {
        //set permissions
        cy.stub(win.Notification, 'permission', 'granted');
        cy.stub(win, 'Notification').as('Notification');
      },
    });

    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    let body = 'You have completed a pomo! Your short break begins now :)'; 
    let icon = 'https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38=';
    let title = 'Productoro';

    //1st Pomo
    cy.get('#startButton').click();
    cy.wait(9*1000);
    cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWithExactly', title, {body, icon});

    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('something about the error')
      //Cypress doesnt like the notif.close() so we prevent the error from stopping tests
      done();
    });

    

    //1st SB
    cy.get('#startButton').click();
    cy.wait(6*1000);
    body = 'Your break has ended. A new pomo begins now :)';
    cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWithExactly', title, {body, icon});

    //2nd Pomo
    cy.get('#startButton').click();
    cy.wait(9*1000);
    body = 'You have completed a pomo! Your short break begins now :)'; 
    cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWithExactly', title, {body, icon});
    

    //2nd SB
    cy.get('#startButton').click();
    cy.wait(6*1000);
    body = 'Your break has ended. A new pomo begins now :)';
    cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWithExactly', title, {body, icon});

    //3rd Pomo
    cy.get('#startButton').click();
    cy.wait(9*1000);
    body = 'You have completed a pomo! Your short break begins now :)'; 
    cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWithExactly', title, {body, icon});

    //3rd SB
    cy.get('#startButton').click();
    cy.wait(6*1000);
    body = 'Your break has ended. A new pomo begins now :)';
    cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWithExactly', title, {body, icon});

    //4th Pomo
    cy.get('#startButton').click();
    cy.wait(9*1000);
    body = 'You have completed a pomo! Your long break begins now :)';
    cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWithExactly', title, {body, icon});

    //LB
    cy.get('#startButton').click();
    cy.wait(6*1000);
    body = 'Your break has ended. A new pomo begins now :)';
    cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWithExactly', title, {body, icon});
  });

  it('Banner Notif Test: Check Banners Dont Appear when Not Supported', () => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html', {
      onBeforeLoad (win) {
        //mock browser not supporting 
        cy.stub(win, 'Notification').as('Notification');
        delete win.Notification
      },
    });
    //DOM Manipulation
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Test begins
    cy.get('#startButton').click();
    cy.wait(9*1000);
    cy.get('@Notification').should('not.have.been.called');
  });

  it('Banner Notif Test: Check Banners Dont Appear when Denied Permissions', () => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html', {
      onBeforeLoad (win) {
        //set permissions
        cy.stub(win.Notification, 'permission', 'denied');
        cy.stub(win.Notification, 'requestPermission').resolves('denied').as('ask');
        cy.stub(win, 'Notification').as('Notification');
      },
    });
    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Test Begins
    //set permissions
    
    cy.get('#startButton').click();
    cy.get('@Notification').should('not.have.been.called');
    
    
  });

  it('Banner Notif Test: Check Asked User When on Default',() =>{
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html', {
      onBeforeLoad (win) {
        //set permissions
        cy.stub(win.Notification, 'permission', 'denied');
        cy.stub(win.Notification, 'requestPermission').resolves('granted').as('ask')
        cy.stub(win, 'Notification').as('Notification');
      },
    });
    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    let body = 'You have completed a pomo! Your short break begins now :)'; 
    let icon = 'https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38=';
    let title = 'Productoro';

    //Test Begins
    cy.get('#startButton').click();
    cy.wait(9*1000);
    //since request permissions resolves in granted we should get a notification
    cy.get('@Notification').should('have.been.calledWithNew').and('have.been.calledWithExactly', title, {body, icon});
  });
});




  










describe('Alarm Notifications Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');

    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds
  });

  it('Alarm Test, Slider On: Check Alarm Plays for Each Pomo and Break', () => {
    //function checks if the pased in noise is muted, ended, or pasued
    function tester(noise){
      return (!noise.muted && !noise.paused && (noise.currentTime != 0) && !noise.ended);
    }
    //Check alarm is heard on Pomo 1
    cy.get('#startButton').click();
    //Wait Pomo time plus 2 seconds
    cy.wait(11*1000);
    //get the Alarm object we use in notifications
    cy.get(getAlarm()).then(($el) => {
      //check that the alarm isnt muted or pasued or finished
      expect(tester($el)).to.be.true;
    });

    //Check alarm is heard on SB 1
    cy.get('#startButton').click();
    //wait SB time plus 2 seconds
    cy.wait(8*1000);
    //get the Alarm object we use in notifications
    cy.get(getAlarm()).then(($el) => {
      //check that the alarm isnt muted or pasued or finished
      expect(tester($el)).to.be.true;
    });

    //Check alarm is heard on Pomo 2
    cy.get('#startButton').click();
    //Wait Pomo time plus 2 seconds
    cy.wait(11*1000);
    //get the Alarm object we use in notifications
    cy.get(getAlarm()).then(($el) => {
      //check that the alarm isnt muted or pasued or finished
      expect(tester($el)).to.be.true;
    });

    //Check alarm is heard on SB 2
    cy.get('#startButton').click();
    //wait SB time plus 2 seconds
    cy.wait(8*1000);
    //get the Alarm object we use in notifications
    cy.get(getAlarm()).then(($el) => {
      //check that the alarm isnt muted or pasued or finished
      expect(tester($el)).to.be.true;
    });

    //Check alarm is heard on Pomo 3
    cy.get('#startButton').click();
    //Wait Pomo time plus 2 seconds
    cy.wait(11*1000);
    //get the Alarm object we use in notifications
    cy.get(getAlarm()).then(($el) => {
      //check that the alarm isnt muted or pasued or finished
      expect(tester($el)).to.be.true;
    });

    //Check alarm is heard on SB 3
    cy.get('#startButton').click();
    //wait SB time plus 2 seconds
    cy.wait(8*1000);
    //get the Alarm object we use in notifications
    cy.get(getAlarm()).then(($el) => {
      //check that the alarm isnt muted or pasued or finished
      expect(tester($el)).to.be.true;
    });

    //Check alarm is heard on Pomo 4
    cy.get('#startButton').click();
    //Wait Pomo time plus 2 seconds
    cy.wait(11*1000);
    //get the Alarm object we use in notifications
    cy.get(getAlarm()).then(($el) => {
      //check that the alarm isnt muted or pasued or finished
      expect(tester($el)).to.be.true;
    });

    //Check alarm is heard on LB
    cy.get('#startButton').click();
    //wait SB time plus 2 seconds
    cy.wait(8*1000);
    //get the Alarm object we use in notifications
    cy.get(getAlarm()).then(($el) => {
      //check that the alarm isnt muted or pasued or finished
      expect(tester($el)).to.be.true;
    });
  });

  it('Alarm Test, Slider Off: Check Alarm Disabled for Each Pomo and Break', () => {
    //function checks if the pased in noise is muted, ended, or pasued
    function tester(noise){
      return (noise.muted || noise.paused);
    }


    //Disable the Alarm
    cy.get('#settingsButton').click();
    cy.get('#notifToggle').invoke('attr', 'checked', false);
    cy.get('#closeSettings').click();

    //Check alarm is heard on Pomo 1
    cy.get('#startButton').click();
    //Wait Pomo time plus 2 seconds
    cy.wait(11*1000);
    //get the Alarm object we use in notifications
    //check that the alarm isnt muted or pasued or finished
    expect(tester(getAlarm())).to.be.true;


    //Check alarm is heard on SB 1
    cy.get('#startButton').click();
    //wait SB time plus 2 seconds
    cy.wait(8*1000);
    //get the Alarm object we use in notifications
    //check that the alarm isnt muted or pasued or finished
    expect(tester(getAlarm())).to.be.true;

    //Check alarm is heard on Pomo 2
    cy.get('#startButton').click();
    //Wait Pomo time plus 2 seconds
    cy.wait(11*1000);
    //get the Alarm object we use in notifications
    //check that the alarm isnt muted or pasued or finished
    expect(tester(getAlarm())).to.be.true;

    //Check alarm is heard on SB 2
    cy.get('#startButton').click();
    //wait SB time plus 2 seconds
    cy.wait(8*1000);
    //get the Alarm object we use in notifications
    //check that the alarm isnt muted or pasued or finished
    expect(tester(getAlarm())).to.be.true;

    //Check alarm is heard on Pomo 3
    cy.get('#startButton').click();
    //Wait Pomo time plus 2 seconds
    cy.wait(11*1000);
    //get the Alarm object we use in notifications
    //check that the alarm isnt muted or pasued or finished
    expect(tester(getAlarm())).to.be.true;

    //Check alarm is heard on SB 3
    cy.get('#startButton').click();
    //wait SB time plus 2 seconds
    cy.wait(8*1000);
    //get the Alarm object we use in notifications
    //check that the alarm isnt muted or pasued or finished
    expect(tester(getAlarm())).to.be.true;

    //Check alarm is heard on Pomo 4
    cy.get('#startButton').click();
    //Wait Pomo time plus 2 seconds
    cy.wait(11*1000);
    //get the Alarm object we use in notifications
    //check that the alarm isnt muted or pasued or finished
    expect(tester(getAlarm())).to.be.true;

    //Check alarm is heard on LB
    cy.get('#startButton').click();
    //wait SB time plus 2 seconds
    cy.wait(8*1000);
    //get the Alarm object we use in notifications
    //check that the alarm isnt muted or pasued or finished
    expect(tester(getAlarm())).to.be.true;
  });

  it('Alarm Test, Turn Slider Off: Check Start Button avialable', () => {
    //Disable the Alarm
    cy.get('#settingsButton').click();
    cy.get('#notifToggle').invoke('attr', 'checked', false);
    cy.get('#closeSettings').click();

    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    })
  });

  it('Alarm Test, Turn Slider Off: Check Reset Button not avialable', () => {
    //Disable the Alarm
    cy.get('#settingsButton').click();
    cy.get('#notifToggle').invoke('attr', 'checked', false);
    cy.get('#closeSettings').click();

    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
  });

  it('Alarm Test, Turn Slider Off: Check Initial State Label', () => {
    //Disable the Alarm
    cy.get('#settingsButton').click();
    cy.get('#notifToggle').invoke('attr', 'checked', false);
    cy.get('#closeSettings').click();

    cy.get('#state').should('have.text','Work State');
  });

  it('Alarm Test, Turn Slider Off: Check Initial Pomo Counters', () => {
    //Disable the Alarm
    cy.get('#settingsButton').click();
    cy.get('#notifToggle').invoke('attr', 'checked', false);
    cy.get('#closeSettings').click();

    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','0');
  });
  

  it('Alarm Test, Turn Slider Off: Check Initial Background Color: Blue', () => {
    //Disable the Alarm
    cy.get('#settingsButton').click();
    cy.get('#notifToggle').invoke('attr', 'checked', false);
    cy.get('#closeSettings').click();

    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Alarm Test, Slider Off: Check Break Reminders Disabled Onload', () => {
    //Disable the Alarm
    cy.get('#settingsButton').click();
    cy.get('#notifToggle').invoke('attr', 'checked', false);
    cy.get('#closeSettings').click();

    cy.get('#breakReminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Alarm Test, Slider Off: Check Progress Bar Fully Lit', () =>{
    //Disable the Alarm
    cy.get('#settingsButton').click();
    cy.get('#notifToggle').invoke('attr', 'checked', false);
    cy.get('#closeSettings').click();

    cy.get('.circle.pomo').should('have.length', 4);
    cy.get('.circle.short').should('have.length', 3);
    cy.get('.circle.long').should('have.length', 1);
  });


  it('Alarm Test, Slider Off: Check Audio Alarm Initally On', () => {
    //Disable the Alarm
    cy.get('#settingsButton').click();
    cy.get('#notifToggle').invoke('attr', 'checked', false);
    cy.get('#closeSettings').click();

    cy.get('#notifToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });

  it('Alarm Test, Slider Off: Check Keyboard Shortcuts Initally On', () => {
    //Disable the Alarm
    cy.get('#settingsButton').click();
    cy.get('#notifToggle').invoke('attr', 'checked', false);
    cy.get('#closeSettings').click();

    cy.get('#keyboardToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });
});

















describe('Keyboard Shortcuts Disabled Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
    //Turn off the keyboard shortcuts
    cy.get('#settingsButton').click();
    cy.get('#keyboardToggle').invoke('attr', 'checked', false);
    cy.get('#closeSettings').click();
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Timer Display Unaffected', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    //Cypress will wait a 5 seconds after the click
    cy.wait(5000)
    cy.get('#timerDisplay').should('have.text','25:00');
  });


  it('Keyboard Shortcuts Disabled: Space Clicked, Start Button Still Enabled', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    })
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Reset Button Still Disabled', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Check Counters Not Updated', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    //Cypress will wait 5 seconds after the click
    cy.wait(5000)
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','0');
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Check State is Work State', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#state').should('have.text','Work State');
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Check Help Not displayed', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Check Settings Not displayed', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Check Background Color Unaffected', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Check Break Reminders Still Disabled', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#breakReminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Progress Bar Unaffected', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('.circle.pomo').should('have.length', 4);
    cy.get('.circle.short').should('have.length', 3);
    cy.get('.circle.long').should('have.length', 1);
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Audio Alarm Still On', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#notifToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Keyboard Shortcuts Still Off', () => {
    cy.get('body').trigger('keydown', { key: '(Space character)', code: 'Space', which: 32 }); 
    cy.get('#keyboardToggle').then(($el) => {
      expect($el).to.have.prop('checked');
    });
  });
});
















describe('Progress Bar Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');

    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds
  });

  //UNSURE HOW TO TEST IF CICLES DEACTIVATED IN CORRECT ORDER :: NEEDS WORK
  it('Testing Four Pomos with Short/Long Breaks and Check if Bar Resets After Long Break', () => {
    //cy.get('.circle.pomo').should('have.length', 4);
    //cy.get('.circle.short').should('have.length', 3);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 0);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //cy.get('.circle.pomo').should('have.length', 3);
    //cy.get('.circle.short').should('have.length', 3);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 1);

    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //cy.get('.circle.pomo').should('have.length', 3);
    //cy.get('.circle.short').should('have.length', 2);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 2);


    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //cy.get('.circle.pomo').should('have.length', 2);
    //cy.get('.circle.short').should('have.length', 2);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 3);

    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //cy.get('.circle.pomo').should('have.length', 2);
    //cy.get('.circle.short').should('have.length', 1);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 4);


    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //cy.get('.circle.pomo').should('have.length', 1);
    //cy.get('.circle.short').should('have.length', 1);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 5);

    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //cy.get('.circle.pomo').should('have.length', 1);
    //cy.get('.circle.short').should('have.length', 0);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 6);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //cy.get('.circle.pomo').should('have.length', 0);
    //cy.get('.circle.short').should('have.length', 0);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 7);

    //start Long break
    cy.get('#startButton').click();
    //finish Long break
    cy.wait(6*1000);

    //cy.get('.circle.pomo').should('have.length', 4);
    //cy.get('.circle.short').should('have.length', 3);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 0);
  });
});











describe('Full Cycle Test', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Full Cycle Test: Run 4 Pomos and 3 SB and 1 LB to ensure Timer counts seconds correctly', () => {
    //Start pomo 1
    cy.get('#startButton').click();
    //Wait out pomo if it takes loner than 25 minutes CYpress will generate error -> failing test
    cy.wait(25*60*1000);

    //Start SB 1
    cy.get('#startButton').click();
    //Wait out SB if it takes loner than 5 minutes CYpress will generate error -> failing test
    cy.wait(5*60*1000);

    //Start pomo 2
    cy.get('#startButton').click();
    //Wait out pomo if it takes loner than 25 minutes CYpress will generate error -> failing test
    cy.wait(25*60*1000);

    //Start SB 2
    cy.get('#startButton').click();
    //Wait out SB if it takes loner than 5 minutes CYpress will generate error -> failing test
    cy.wait(5*60*1000);

    //Start pomo 3
    cy.get('#startButton').click();
    //Wait out pomo if it takes loner than 25 minutes CYpress will generate error -> failing test
    cy.wait(25*60*1000);

    //Start SB 3
    cy.get('#startButton').click();
    //Wait out SB if it takes loner than 5 minutes CYpress will generate error -> failing test
    cy.wait(5*60*1000);

    //Start pomo 4
    cy.get('#startButton').click();
    //Wait out pomo if it takes loner than 25 minutes CYpress will generate error -> failing test
    cy.wait(25*60*1000);

    //Start LB 1
    cy.get('#startButton').click();
    //Wait out LB if it takes loner than 15 minutes CYpress will generate error -> failing test
    cy.wait(15*60*1000);
  });
});

