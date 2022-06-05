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
});

describe.only("Reset Button Tests", () => {
  beforeEach(() => {
    cy.visit("https://productoro-b340e.web.app/");
    cy.wait(1000); // wait till the tutorial appears
    cy.get(".introjs-skipbutton").click();
  });

  it("Reset Button Clicked: Timer Display Resets", () => {
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

  it("Reset Button Clicked: Help Not displayed", () => {
    cy.get("#start-button").click();
    cy.get("#reset-button").click();
    cy.get("#help-modal").then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it("Reset Button Clicked: Check Background Color Unaffected", () => {
    cy.get("#start-button").click();
    cy.get("#reset-button").click();
    cy.get("body").then(($el) => {
      expect($el).to.have.attr("state", "pomo");
    });
  });

  it("Reset Button Clicked: Check Break Reminders still Disabled", () => {
    cy.get("#start-button").click();
    cy.get("#break-reminder").should("have.text", "");
    cy.get("#reminder").then(($el) => {
      expect($el).to.be.hidden;
    });

    cy.wait(1000 * 3);
    cy.get("#reset-button").click();
    cy.get("#break-reminder").should("have.text", "");
    cy.get("#reminder").then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it("Reset Button Clicked: Progress Bar Still Fully Lit", () => {
    cy.get("#start-button").click();
    cy.get("#reset-button").click();
    cy.get(".circle.pomo").should("have.length", 4);
    cy.get(".circle.short").should("have.length", 3);
    cy.get(".circle.long").should("have.length", 1);
  });

  it("Reset Button Clicked: Settings Not displayed", () => {
    cy.get("#start-button").click();
    cy.wait(1000);
    cy.get("#reset-button").click();
    cy.get("#settings-modal").then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it("Reset Button Clicked: Audio Alarm Still On", () => {
    cy.get("#start-button").click();
    cy.wait(1000);
    cy.get("#reset-button").click();
    cy.get("#notif-toggle").then(($el) => {
      expect($el).to.have.prop("checked");
    });
  });

  it("Reset Button Clicked: Keyboard Shortcuts Still On", () => {
    cy.get("#start-button").click();
    cy.wait(1000);
    cy.get("#reset-button").click();
    cy.get("#keyboard-toggle").then(($el) => {
      expect($el).to.have.prop("checked");
    });
  });
});

describe("State Label and Timer Display Tests", () => {
  beforeEach(() => {
    cy.visit(
      "https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html"
    );

    //DOM Maninpulation to get short pomo/break times :)
    cy.get("#settings-button").click();
    cy.get("#work-option60").invoke("prop", "innerHTML", ".15");
    cy.get("#work-option60").invoke("prop", "value", ".15");

    cy.get("#sb-option15").invoke("prop", "innerHTML", ".1");
    cy.get("#sb-option15").invoke("prop", "value", ".1");

    cy.get("#lb-option15").invoke("prop", "innerHTML", ".1");
    cy.get("#lb-option15").invoke("prop", "value", ".1");

    cy.get("#short-break-time").select(".1");
    cy.get("#long-break-time").select(".1");
    cy.get("#work-time").select(".15");

    cy.get("#close-settings").click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds
  });

  it("State Label and Display: Label On Work State and Display on 00:04 After 5 Seconds", () => {
    //press start
    cy.get("#start-button").click();
    cy.wait(5000);

    //check display
    cy.get("#timer-display").should("have.text", "00:04");
    //check state
    cy.get("#state").should("have.text", "Work State");
  });

  it("State Label and Display: Label On Work State and Display on 00:09 After Reset", () => {
    //press start
    cy.get("#start-button").click();
    cy.wait(1000);
    cy.get("#reset-button").click();

    //check state
    cy.get("#state").should("have.text", "Work State");
    //since we manipulated the dom to input a fraction of a minute we expect the weird frozen display
    //check display
    cy.get("#timer-display").should("have.text", ".15:00");

    //press start to get the display back to a normal form
    cy.get("#start-button").click();
    //check display
    cy.get("#timer-display").should("have.text", "00:09");

    cy.wait(2000);
    //check display after 2 seconds
    cy.get("#timer-display").should("have.text", "00:07");
  });

  it("State Label and Display: Label On Short Break State and Display on 00:06 After Pomo", () => {
    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);

    //check state
    cy.get("#state").should("have.text", "Short Break State");
    //since we manipulated the dom to input a fraction of a minute we expect the weird frozen display
    //check display
    cy.get("#timer-display").should("have.text", "0.1:00");

    //press start to get the display back to a normal form
    cy.get("#start-button").click();
    //check display
    cy.get("#timer-display").should("have.text", "00:06");

    cy.wait(2000);
    //check display after 2 seconds
    cy.get("#timer-display").should("have.text", "00:04");
  });

  it("State Label and Display: Label On Work State and Display on 00:09 After Break", () => {
    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //check state
    cy.get("#state").should("have.text", "Work State");
    //since we manipulated the dom to input a fraction of a minute we expect the weird frozen display
    //check display
    cy.get("#timer-display").should("have.text", ".15:00");

    //press start to get the display back to a normal form
    cy.get("#start-button").click();
    //check display
    cy.get("#timer-display").should("have.text", "00:09");

    cy.wait(2000);
    //check display after 2 seconds
    cy.get("#timer-display").should("have.text", "00:07");
  });

  it("State Label and Display: Label On LB State and Display on 00:06 After 4 Pomos", () => {
    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);

    //check state
    cy.get("#state").should("have.text", "Long Break State");
    //since we manipulated the dom to input a fraction of a minute we expect the weird frozen display
    //check display
    cy.get("#timer-display").should("have.text", ".1:00");

    //press start to get the display back to a normal form
    cy.get("#start-button").click();
    //check display
    cy.get("#timer-display").should("have.text", "00:06");

    cy.wait(2000);
    //check display after 2 seconds
    cy.get("#timer-display").should("have.text", "00:04");
  });

  it("State Label and Display: Label On Work State and Display on 00:09 After LB", () => {
    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //check state
    cy.get("#state").should("have.text", "Work State");
    //since we manipulated the dom to input a fraction of a minute we expect the weird frozen display
    //check display
    cy.get("#timer-display").should("have.text", ".15:00");

    //press start to get the display back to a normal form
    cy.get("#start-button").click();
    //check display
    cy.get("#timer-display").should("have.text", "00:09");

    cy.wait(2000);
    //check display after 2 seconds
    cy.get("#timer-display").should("have.text", "00:07");
  });
});

describe("Background Color Tests", () => {
  beforeEach(() => {
    cy.visit(
      "https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html"
    );

    //DOM Maninpulation to get short pomo/break times :)
    cy.get("#settings-button").click();
    cy.get("#work-option60").invoke("prop", "innerHTML", ".15");
    cy.get("#work-option60").invoke("prop", "value", ".15");

    cy.get("#sb-option15").invoke("prop", "innerHTML", ".1");
    cy.get("#sb-option15").invoke("prop", "value", ".1");

    cy.get("#lb-option15").invoke("prop", "innerHTML", ".1");
    cy.get("#lb-option15").invoke("prop", "value", ".1");

    cy.get("#short-break-time").select(".1");
    cy.get("#long-break-time").select(".1");
    cy.get("#work-time").select(".15");

    cy.get("#close-settings").click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds
  });

  it("Background Color: Orange at Short Break", () => {
    cy.get("#start-button").click();
    //Complete the pomo
    cy.wait(9 * 1000);

    //check background is orange
    cy.get("body").then(($el) => {
      expect($el).to.have.attr("state", "short");
    });
  });

  it("Background Color: Blue after Short Break", () => {
    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);

    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //now in work state
    //check background is orange
    cy.get("body").then(($el) => {
      expect($el).to.have.attr("state", "pomo");
    });
  });

  it("Background Color: Green at Long Break", () => {
    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);

    //now in long break state
    //check background is green
    cy.get("body").then(($el) => {
      expect($el).to.have.attr("state", "long");
    });
  });

  it("Background Color: Blue after Long Break", () => {
    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start break
    cy.get("#start-button").click();
    //finish break
    cy.wait(6 * 1000);

    //start pomo
    cy.get("#start-button").click();
    //finish pomo
    cy.wait(9 * 1000);
    //start Long break
    cy.get("#start-button").click();
    //finish Long break
    cy.wait(6 * 1000);

    //now in long break state
    //check background is blue
    cy.get("body").then(($el) => {
      expect($el).to.have.attr("state", "pomo");
    });
  });
});
