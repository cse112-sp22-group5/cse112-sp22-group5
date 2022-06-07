// Tutorial Modal
describe("Tutorial Model", () => {
    beforeEach(() => {
        cy.visit("https://productoro-b340e.web.app/");
        cy.wait(1000); // wait till the tutorial appears
        cy.get(".introjs-skipbutton").click();
    });
  
    it("Tutorial button opens tutorial", () => {
      cy.get("#help-icon").click();
      cy.get(".introjs-tooltiptext").should(
        "have.text",
        "Welcome to Productoro!"
      );
    });
  
    it("Tutorial close button works", () => {
        cy.get("#help-icon").click();

        cy.wait(500); // wait half a second before another button click

        cy.get(".introjs-skipbutton").click();
        cy.get(".introjs-tooltiptext").should('not.exist');
    });

    it("Tutorial next and back buttons work", () => {
        cy.get("#help-icon").click();

        cy.wait(500); // wait half a second before another button click
        cy.get(".introjs-button.introjs-nextbutton").click();
        
        cy.wait(500); // wait half a second for the tutorial to change
        cy.get(".introjs-helperNumberLayer").should(
            "have.text",
            "2 of 13"
        );

        cy.get(".introjs-button.introjs-prevbutton").click();

        cy.wait(500); // wait half a second for the tutorial to change
        cy.get(".introjs-helperNumberLayer").should(
            "have.text",
            "1 of 13"
        );
    });

    it("Done button instead of next at the end", () => {
        cy.get("#help-icon").click();

        cy.wait(500); // wait half a second before another button click
        cy.get(".introjs-button.introjs-nextbutton").click(); // 2
        cy.get(".introjs-button.introjs-nextbutton").click(); // 3
        cy.get(".introjs-button.introjs-nextbutton").click(); // 4
        cy.get(".introjs-button.introjs-nextbutton").click(); // 5
        cy.get(".introjs-button.introjs-nextbutton").click(); // 6
        cy.get(".introjs-button.introjs-nextbutton").click(); // 7
        cy.get(".introjs-button.introjs-nextbutton").click(); // 8
        cy.get(".introjs-button.introjs-nextbutton").click(); // 9
        cy.get(".introjs-button.introjs-nextbutton").click(); // 10
        cy.get(".introjs-button.introjs-nextbutton").click(); // 11
        cy.get(".introjs-button.introjs-nextbutton").click(); // 12
        cy.get(".introjs-button.introjs-nextbutton").click(); // 13
        
        cy.wait(500); // wait half a second for the tutorial to change
        cy.get(".introjs-helperNumberLayer").should(
            "have.text",
            "13 of 13"
        );
        cy.get(".introjs-button.introjs-nextbutton.introjs-donebutton").should(
            "have.text",
            "Done"
        );
        
        cy.get(".introjs-button.introjs-nextbutton.introjs-donebutton").click();
        cy.get(".introjs-tooltiptext").should('not.exist');
    });
});

// Settings Modal
describe.only("Settings Model", () => {
    beforeEach(() => {
        cy.visit("https://productoro-b340e.web.app/");
        cy.wait(1000); // wait till the tutorial appears
        cy.get(".introjs-skipbutton").click();
    });
    
    it("Settings button opens settings", () => {
      cy.get("#setting-icon").click();

      cy.wait(500); // wait till the sidebar appears
      cy.get(".sidebar-content").then(($el) => {
        expect($el).to.be.visible;
      });
      cy.get("#time-limits").then(($el) => {
        expect($el).to.be.visible;
      });
    });

    it("Changing work time changes work time", () => {
        cy.get("#setting-icon").click();
  
        cy.wait(500); // wait till the sidebar appears
        cy.get('#work-time').select('30').should('have.value', '30');
        cy.get('#timer-display').should(
            "have.text",
            "30:00"
          );
    });

    it("Choosing a music to play", () => {
        cy.get("#setting-icon").click();
  
        cy.wait(500); // wait till the sidebar appears
        cy.get('#bg-music').select('Lofi').should('have.value', 'Lofi');
        cy.get("#current-mix").should('be.visible');
    });

    it("Turning audio alarm off", () => {
        cy.get("#setting-icon").click();
  
        cy.wait(500); // wait till the sidebar appears
        cy.get('#notif-toggle').select('Off').should('have.value', 'off');
    });
});
