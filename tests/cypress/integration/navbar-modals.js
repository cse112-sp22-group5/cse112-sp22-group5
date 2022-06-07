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
describe("Settings Model", () => {
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

// Tasks Modal
describe("Tasks Model", () => {
    beforeEach(() => {
        cy.visit("https://productoro-b340e.web.app/");
        cy.wait(1000); // wait till the tutorial appears
        cy.get(".introjs-skipbutton").click();
    });
    
    it("Task button opens tasks", () => {
      cy.get("#tasks-icon").click();

      cy.wait(500); // wait till the sidebar appears
      cy.get(".sidebar-content").then(($el) => {
        expect($el).to.be.visible;
      });
      cy.get("#input-container").then(($el) => {
        expect($el).to.be.visible;
      });
    });

    it("Add, done, and delete a task", () => {
        cy.get("#tasks-icon").click();
  
        cy.wait(500); // wait till the sidebar appears
        cy.get('#task-name').type('hi');
        cy.get("#save-button").click();

        cy.wait(500); // wait till the task is entered
        cy.get(".task-label").then(($el) => {
            expect($el).to.have.attr("for", "hi");
        });

        // click done for the task
        cy.get('[src="./img/icons/check-circle-icon-white.svg"]').click();

        cy.wait(500); // wait till the task is rendered as done
        cy.get(".task").then(($el) => {
            expect($el).to.have.attr("done", "true");
        });

        // click done for the task
        cy.get('[src="./img/icons/delete-icon.svg"]').click();

        cy.wait(500); // wait for the task to get deleted
        cy.get('.task').should('not.exist');
    });
});

// Styles and Themes Modal
describe("Styles and Themes Model", () => {
    beforeEach(() => {
        cy.visit("https://productoro-b340e.web.app/");
        cy.wait(1000); // wait till the tutorial appears
        cy.get(".introjs-skipbutton").click();
    });
    
    it("Styles and Themes button opens Styles and Themes", () => {
      cy.get("#theme-icon").click();

      cy.wait(500); // wait till the sidebar appears
      cy.get(".sidebar-content").then(($el) => {
        expect($el).to.be.visible;
      });
      cy.get(".setting-flex-container").then(($el) => {
        expect($el).to.be.visible;
      });
    });

    it("Switch themes", () => {
        cy.get("#theme-icon").click();

        cy.wait(500); // wait till the sidebar appears
        cy.get('#theme').select('Dark').should('have.value', '2');

        cy.wait(500); // wait till the task is entered
        cy.get("body")
        .should("have.css", "background-color")
        .and("eq", "rgb(37, 37, 37)");
    });

    it("Switch to colorblind", () => {
        cy.get("#theme-icon").click();

        cy.wait(500); // wait till the sidebar appears
        cy.get('#color-blindness').select('On').should('have.value', '4');

        cy.wait(500); // wait till the task is entered
        cy.get("body")
        .should("have.css", "background-color")
        .and("eq", "rgb(178, 223, 251)");
    });

    it("Switch backgrounds", () => {
        cy.get("#theme-icon").click();

        cy.wait(500); // wait till the sidebar appears
        cy.get('[type="radio"]').check("0");

        cy.wait(1000); // wait till the task is entered
        cy.get("body").then(($el) => {
            expect($el).to.have.attr("style", 'background-image: url("https://wallpaperaccess.com/full/274198.jpg");');
        });
    });

    it("Submit background", () => {
        cy.get("#theme-icon").click();

        cy.wait(500); // wait till the sidebar appears
        cy.get('#bg-url').type('https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg');
        cy.get('#bg-url-submit').click();
        
        cy.wait(1000); // wait till the task is entered
        cy.get("body").then(($el) => {
            expect($el).to.have.attr("style", 'background-image: url("https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg");');
        });
    });

    it("Reset to default", () => {
        cy.get("#theme-icon").click();

        cy.wait(500); // wait till the sidebar appears
        cy.get('#theme').select('Dark').should('have.value', '2');
        cy.get('[type="radio"]').check("0");

        cy.wait(1000); // wait till the background and theme changes
        cy.get("#theme-default").click();

        cy.wait(500); // wait till the background and theme changes
        cy.get("body")
        .should("have.css", "background-color")
        .and("eq", "rgba(77, 150, 255, 0.75)");
        cy.get("body").then(($el) => {
            expect($el).to.have.attr("style", '');
        });
    });
});
