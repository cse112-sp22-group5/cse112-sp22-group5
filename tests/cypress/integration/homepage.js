// Inital No Actvity Tests
describe("Fresh Entry, No Activity Tests", () => {
  beforeEach(() => {
    cy.visit("https://productoro-b340e.web.app/");
  });

  it("Tutorial should start", () => {
    cy.get(".introjs-tooltiptext").should(
      "have.text",
      "Welcome to Productoro!"
    );
    cy.get(".introjs-skipbutton").click();
  });

  it("Timer Display at 25 minutes", () => {
    cy.get("#timer-display").should("have.text", "25:00");
  });

  it("Start Button avialable", () => {
    cy.get("#start-button").then(($el) => {
      expect($el).to.not.have.attr("disabled");
    });
  });

  it("Reset Button not avialable", () => {
    cy.get("#reset-button").then(($el) => {
      expect($el).to.have.attr("disabled");
    });
  });

  it("Initial State Label", () => {
    cy.get("#state").should("have.text", "Work State");
  });

  it("Initial Work State Color", () => {
    cy.get("#progress-pomo")
      .should("have.css", "background-color")
      .and("eq", "rgb(237, 102, 99)");
  });

  it("Initial Pomo Counters", () => {
    cy.get("#streak").should("have.text", "0");
    cy.get("#total").should("have.text", "0");
  });

  it("Sidebar hidden on start", () => {
    cy.get(".sidebar-content").then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it("Initial Background Color: Blue", () => {
    cy.get("body").then(($el) => {
      expect($el).to.have.attr("data-state", "pomo");
    });
  });

  it("Break Reminders Disabled Onload", () => {
    cy.get("#break-reminder").should("have.text", "");
    cy.get("#reminder").then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it("Audio Alarm: Initally On", () => {
    cy.get("#notif-toggle").should("have.value", "on");
  });

  it("Keyboard Shortcuts: Initally On", () => {
    cy.get("#keyboard-toggle").should("have.value", "on");
  });
});

// Start Button Tests
describe("Start Button Tests", () => {
  beforeEach(() => {
    cy.visit("https://productoro-b340e.web.app/");
    cy.wait(1000); // wait till the tutorial appears
    cy.get(".introjs-skipbutton").click();
  });

  it("Start Button Clicked: Check Timer Display 24:59", () => {
    cy.get("#start-button").click();
    cy.wait(1000); // Wait 1 second after the click
    cy.get("#timer-display").should("have.text", "24:59");
  });

  it("Start Button Clicked: Check Start Button Gets Disabled", () => {
    cy.get("#start-button").click();
    cy.get("#start-button").then(($el) => {
      expect($el).to.have.attr("disabled");
    });
  });

  it("Start Button Clicked: Check Reset Button Gets Enabled", () => {
    cy.get("#start-button").click();
    cy.get("#reset-button").then(($el) => {
      expect($el).to.not.have.attr("disabled");
    });
  });

  it("Start Button Clicked: Check State is Work State", () => {
    cy.get("#start-button").click();
    cy.get("#state").should("have.text", "Work State");
    cy.get("#reset-button").click();
  });

  it("Start Button Clicked: Check Break Reminders still Disabled", () => {
    cy.get("#start-button").click();
    cy.get("#break-reminder").should("have.text", "");
    cy.get("#reminder").then(($el) => {
      expect($el).to.be.hidden;
    });
    cy.get("#reset-button").click();
  });

  it("Start Button Clicked: Still on Work State for Progress Bar", () => {
    cy.get("#start-button").click();
    cy.get("#progress-pomo")
      .should("have.css", "background-color")
      .and("eq", "rgb(237, 102, 99)");
  });

  // it('Start Button Clicked: Check Buttons Gets Enabled/Disabled correctly for entire cycle', () => {
  //   //DOM Maninpulation to get short pomo/break times :)
  //   cy.get('#setting-icon').click();
  //   cy.get('#work-option60').invoke('prop', 'innerHTML', '.15');
  //   cy.get('#work-option60').invoke('prop', 'value', '.15');

  //   cy.get('#sb-option15').invoke('prop', 'innerHTML', '.1');
  //   cy.get('#sb-option15').invoke('prop', 'value', '.1');

  //   cy.get('#lb-option15').invoke('prop', 'innerHTML', '.1');
  //   cy.get('#lb-option15').invoke('prop', 'value', '.1');

  //   cy.get('#short-break-time').select('.1');
  //   cy.get('#long-break-time').select('.1');
  //   cy.get('#work-time').select('.15');

  //   cy.get('#close-settings').click();

  //   //Pomo: 9 Seconds
  //   //SB: 6 seconds
  //   //LB: 6 seconds

  //   //start pomo1
  //   cy.get('#start-button').click();
  //   //check the buttons are correctly disabled and enabled
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.not.have.attr('disabled');
  //   });
  //   //finish pomo1
  //   cy.wait(9000);
  //   //at new SB check pressibility
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.not.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });

  //   //start SB1
  //   cy.get('#start-button').click();
  //   //check the buttons are correctly disabled
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });
  //   //finish SB1
  //   cy.wait(6000);
  //   //at new pomo check pressibility
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.not.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });

  //   //start Pomo2
  //   cy.get('#start-button').click();
  //   //check the buttons are correctly disabled and enabled
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.not.have.attr('disabled');
  //   });
  //   //finish Pomo2
  //   cy.wait(9000);
  //   //at new SB check pressibility
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.not.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });

  //   //start SB2
  //   cy.get('#start-button').click();
  //   //check the buttons are both disabled
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });
  //   //finish SB2
  //   cy.wait(6000);
  //   //at new pomo check pressibility
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.not.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });

  //   //start Pomo3
  //   cy.get('#start-button').click();
  //   //check the buttons are correctly disabled and enabled
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.not.have.attr('disabled');
  //   });
  //   //finish Pomo3
  //   cy.wait(9000);
  //   //at new SB check pressibility
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.not.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });

  //   //start SB3
  //   cy.get('#start-button').click();
  //   //check the buttons are both disabled
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });
  //   //finish SB3
  //   cy.wait(6000);
  //   //at new pomo check pressibility
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.not.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });

  //   //start Pomo4
  //   cy.get('#start-button').click();
  //   //check the buttons are correctly disabled and enabled
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.not.have.attr('disabled');
  //   });
  //   //finish Pomo4
  //   cy.wait(9000);
  //   //at new LB check pressibility
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.not.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });

  //   //start LB
  //   cy.get('#start-button').click();
  //   //check the buttons are both disabled
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });
  //   //finish LB
  //   cy.wait(6000);
  //   //at new pomo check pressibility
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.not.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });

  //   //check the buttons are correctly disabled and enabled at new cycle start
  //   cy.get('#start-button').click();
  //   cy.get('#start-button').then(($el) => {
  //     expect($el).to.have.attr('disabled');
  //   });
  //   cy.get('#reset-button').then(($el) => {
  //     expect($el).to.not.have.attr('disabled');
  //   });

  // });

  it("Start Button Clicked: Check Counters Not Updated", () => {
    cy.get("#start-button").click();
    cy.wait(1000); // Wait 1 second
    cy.get("#streak").should("have.text", "0");
    cy.get("#total").should("have.text", "0");
  });

  it("Start Button Clicked: Audio Alarm Still On", () => {
    cy.get("#start-button").click();
    cy.get("#notif-toggle")
    .find("option:selected")
    .should("have.value", "on");
  });

  it("Start Button Clicked: Keyboard Shortcuts Still On", () => {
    cy.get("#start-button").click();
    cy.get("#keyboard-toggle")
    .find("option:selected")
    .should("have.value", "on");
  });
});

// Reset Button Tests
describe("Reset Button Tests", () => {
  beforeEach(() => {
    cy.visit("https://productoro-b340e.web.app/");
    cy.wait(1000); // wait till the tutorial appears
    cy.get(".introjs-skipbutton").click();
  });

  it("Reset Button Clicked: Timer Resets to 25:00", () => {
    cy.get("#start-button").click();
    cy.wait(1000); // Wait a 1 second after the click
    cy.get("#timer-display").should("have.text", "24:59");
    cy.get("#reset-button").click();
    cy.get("#timer-display").should("have.text", "25:00");
  });

  it("Reset Button Clicked: Check Reset Button Gets Disabled", () => {
    cy.get("#start-button").click();
    cy.get("#reset-button").click();
    cy.get("#reset-button").then(($el) => {
      expect($el).to.have.attr("disabled");
    });
  });

  it("Reset Button Clicked: Check Start Button Gets Enabled", () => {
    cy.get("#start-button").click();
    cy.get("#reset-button").click();
    cy.get("#start-button").then(($el) => {
      expect($el).to.not.have.attr("disabled");
    });
  });

  // it("Reset Button Clicked: Check Only Streak was Killed", () => {
  //   cy.get("#start-button").click();
  //   //Cypress will wait 5 seconds after the click
  //   cy.wait(5000);
  //   //Not sure if this is the right way to set the inner html
  //   cy.get("#streak").invoke("prop", "innerHTML", "1");
  //   cy.get("#total").invoke("prop", "innerHTML", "1");
  //   cy.get("#streak").should("have.text", "1");
  //   cy.get("#total").should("have.text", "1");
  //   cy.wait(5000);

  //   //check only streak gets reset
  //   cy.get("#reset-button").click();
  //   cy.get("#streak").should("have.text", "0");
  //   cy.get("#total").should("have.text", "1");
  // });

  it("Reset Button Clicked: Check State is Work State", () => {
    cy.get("#start-button").click();
    cy.get("#reset-button").click();
    cy.get("#state").should("have.text", "Work State");
  });

  it("Reset Button Clicked: Check Background Color Unaffected", () => {
    cy.get("#start-button").click();
    cy.get("#reset-button").click();
    cy.get("body").then(($el) => {
      expect($el).to.have.attr("data-state", "pomo");
    });
  });

  it("Reset Button Clicked: Check Break Reminders still Disabled", () => {
    cy.get("#start-button").click();
    cy.get("#break-reminder").should("have.text", "");
    cy.get("#reminder").then(($el) => {
      expect($el).to.be.hidden;
    });

    cy.wait(1000); // wait for a second to pass before clicking on reset

    cy.get("#reset-button").click();
    cy.get("#break-reminder").should("have.text", "");
    cy.get("#reminder").then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it("Reset Button Clicked: Still on Work State for Progress Bar", () => {
    cy.get("#start-button").click();
    cy.get("#reset-button").click();
    cy.get("#progress-pomo")
      .should("have.css", "background-color")
      .and("eq", "rgb(237, 102, 99)");
  });

  it("Reset Button Clicked: Audio Alarm Still On", () => {
    cy.get("#start-button").click();
    cy.wait(1000); // wait a second before clicking reset
    cy.get("#reset-button").click();
    cy.get("#notif-toggle")
    .find("option:selected")
    .should("have.value", "on");
  });

  it("Reset Button Clicked: Keyboard Shortcuts Still On", () => {
    cy.get("#start-button").click();
    cy.wait(1000); // wait a second before clicking reset
    cy.get("#reset-button").click();
    cy.get("#keyboard-toggle")
    .find("option:selected")
    .should("have.value", "on");
  });
});
