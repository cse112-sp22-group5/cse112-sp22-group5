# HTML

    <!DOCTYPE html>
    <html>
        <head>
            <meta name='description' content=''>
            <title></title>
        </head>
        <body>
            <div id='header'>
            </div> <!-- end of header div-->
            <div id='container'>
                <div id='content'>
                </div> <!-- end of content div-->
                <div id='side-bar'>
                </div> <!-- end of side-bar div-->
            </div> <!-- end of header div-->
            <div id='footer'>
            </div> <!-- end of footer div-->
        </body>
    </html>

* Use div tags to divide page into *major* sections

## Shortcuts
### #[idName]
  create div with id of idName

    type #header and hit enter to get <div id='header'></div>

### .[className]
  create div with class of className

    type .container and hit enter to get <div class='container'></div>

### [tagName]*numberofTags
  create multiple tags in one line

    type li*3 to get
    <li></li>
    <li></li>
    <li></li>

### Mix them!
  create multiple tags with ids or classes

    type li.items*3 to get
    <li class='items'></li>
    <li class='items'></li>
    <li class='items'></li>

# CSS

    /******** Variables ********/
    :root {
        --color-light: #FFFFFF;
        --color-base: #E0E0E0;
        --color-accent: #6246EA;

        --font1: 'Raleway', sans-serif;
    }
    /******** General Styles ********/
    body {

    }
    h1, h2, h3 {

    }
    p {

    }
    a {

    }
    /******** Utilities ********/
    .nobullets {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    /******** Header Style ********/
    #header {

    }
    /******** Navigation Style ********/
    #nav {

    }
    /******** Footer Style ********/
    #footer {

    }

# Javascript
VSCode can understand JSDoc annotations so typing /** and hitting enter should provide a function header template.

    /**
     * @name
     * @function
     * @description
     * @param {type} [name] [description] 
     * @return {type}
     */

Example
    
    /**
     * @name updateTimer
     * @function
     * @description Decrements the timer down to 0
     * @param {number} duration The total number of seconds the timer should run
     */
