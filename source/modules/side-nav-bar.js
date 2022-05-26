/*************************** NOTE **********************************************
 * To add more side content to the side bar:
 * Under side-nav-bar add:
 *  - add  <i class='menu-icon' id='<new-content-go-herer-icon>' 
 *         data-associated-div='<new-content-go-here-div>' title='<optional>'>
 *  - add <img class='icon' src='link/to/your/icon' >
 * Add new side bar content div:
 *  - <div class='sidebar-content' id='<new-content-gohere-div'>
 * Update global variables accordingly
 ******************************************************************************/

const CONTENT_DIV = {
  'help-div': false,
  'setting-div': false,
  'tasks-div': false,
};
const CONTENT_ICONS = {
  'help-icon': false,
  'setting-icon': false,
  'tasks-icon': false,
};


const SCREEN_SIZE = 700;
/**
 * @name setdivWidth
 * @function
 * @description Calculate sidebar content based on window width
 * @param {integer} windowWidth
 * @returns width of sidebar content in percent
 */
function setdivWidth(windowWidth) {
  if (windowWidth > 1500) return 30;
  else if (windowWidth > 1200) return 45;
  else if (windowWidth > 700) return 50;
  else return 100;
}

/**
 * @name toggleMenu
 * @function
 * @description toggle side content
 * @param {string} divID id of the content
 */
function toggleMenu(divID) {
  let content_div = JSON.parse(JSON.stringify(CONTENT_DIV));
  if (content_div.hasOwnProperty(divID)) content_div[divID] = true;
  for (const key in content_div) {
    let sideContent = document.getElementById(key);
    if (content_div[key] === true) {
      const sideBarWidth = 70; // px
      let divWidth = 100; // %
      let windowWidth = window.innerWidth;

      let sideBarWidthPercentage = Math.round(
        (sideBarWidth / windowWidth) * 100
      );
      divWidth = setdivWidth(windowWidth);
      sideContent.style.width = `${divWidth - sideBarWidthPercentage}%`;

      sideContent.style.padding = `0px 0% 0px ${sideBarWidthPercentage}%`;

    } 
    else {
      sideContent.style.width = '';
      sideContent.style.padding = '0';
    }
  }
}

/**
 * @name setIconBackGround
 * @function
 * @description Set background of the icon when it is clicked
 * @param {string} btnID button id
 */
function setIconBackGround(btnID) {
  let content_icons = JSON.parse(JSON.stringify(CONTENT_ICONS));
  if (content_icons.hasOwnProperty(btnID)) content_icons[btnID] = true;
  for (const key in content_icons) {
    if (content_icons[key])
      document.getElementById(key).classList.add('button-clicked');
    else document.getElementById(key).classList.remove('button-clicked');
  }
}

/**
 * @name expandSideBar
 * @function
 * @description expands the side navigation bar and set the arrow icon up
 */
function expandSideBar() {
  document.querySelector('.side-nav-bar').style.height = '100%';
  document.querySelector('#arrow-down > img').
    src = './img/icons/arrow-up-icon.svg';
}

/**
 * @name minimizeSideBar
 * @function
 * @description minimizes the side navigation bar and set the arrow icon down
 */
function minimizeSideBar() {
  document.querySelector('.side-nav-bar').style.height = '';
  document.querySelector('#arrow-down > img').
    src = './img/icons/arrow-down-icon.svg';

  toggleMenu(null);
}

/**
 * @name setSideBar
 * @function
 * @description depends on window side, expand or minimize the side bar
 */
function setSideBar() {
  if (window.innerWidth > SCREEN_SIZE)
    expandSideBar();
  else
    minimizeSideBar();
}

/**
 * @name setDefaultSettings
 * @function
 * @description Set timer, music, keyboard shortcuts, and alarm settings to default values
 * @returns 
 */
 function setDefaultSettings() {
  const defaultSetting = {
    'work-time'        : '25',
    'short-break-time' : '5',
    'long-break-time'  : '15',
    'bg-music'         : 'None',
    'keyboard-toggle'  : 'on',
    'notif-toggle'     : 'on',
    'alarm-volume'     : '100',
    'alarm-sounds'     : '1'
  };
  for (const key in defaultSetting) {
    document.getElementById(key).value = defaultSetting[key];
  }
}

// Expands sidebar based on window width
document.querySelector('#arrow-down').addEventListener('click', (event) => {
  const menuStyle = document.querySelector('.side-nav-bar').style;
  if (parseInt(menuStyle.height) == 0 || menuStyle.height == '' ) {
    expandSideBar();
  }
  else {
    minimizeSideBar();
  }
  
})

// Set background color for menu icons
document.querySelectorAll('.menu-icon').forEach((elem) => {
  elem.addEventListener('click', (event) => {
    const id = elem.getAttribute('data-associated-div');
    const side = document.getElementById(id).offsetWidth;
    if (side === 0) {
      toggleMenu(id);
      setIconBackGround(elem.getAttribute('id'));
    } else {
      toggleMenu(null);
      setIconBackGround(null);
    }
  });
});

// closes side bar or panels when resizing the window
window.addEventListener('resize', () => {
  toggleMenu(null);
  setIconBackGround(null);
  setSideBar();
});

/**
 * If user clicks on areas that are outside menu and panels, it closes
 */
window.addEventListener('click', (event) => {
  const windowWidth = window.innerWidth;
  const divWidth = setdivWidth(windowWidth);
  const menuWidth = getComputedStyle(document.documentElement).getPropertyValue('--side-bar-width');

  if ((event.clientX/windowWidth * 100) >= divWidth)
  {
    toggleMenu(null);
    setIconBackGround(null);
  }

  function menuIcon () {
    const content = document.querySelectorAll('.sidebar-content');

    for (let i = 0; i < content.length; i++)
      if (content[i].style.width != '')
        return false;
    return true;
  }
  if (event.clientX >= parseInt(menuWidth) && menuIcon())
  {
    setSideBar();
  }
});


// For touch screen devices
window.addEventListener('touchstart', (event) => {
  const windowWidth = window.innerWidth
  const divWidth = setdivWidth(windowWidth);
  const menuWidth = getComputedStyle(document.documentElement).getPropertyValue('--side-bar-width');
  if ((event.touches[0].clientX/windowWidth * 100) >= divWidth)
  {
    toggleMenu(null);
    setIconBackGround(null);
    setSideBar();
  }

  function menuIcon () {
    const content = document.querySelectorAll('.sidebar-content');

    for (let i = 0; i < content.length; i++)
      if (content[i].style.width != '')
        return false;
    return true;
  }

  if (event.touches[0].clientX >= parseInt(menuWidth) && menuIcon ())
  {
    setSideBar();
  }
});

 export { setDefaultSettings };
