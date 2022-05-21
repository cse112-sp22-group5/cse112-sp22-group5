function setdivWidth (windowWidth) {
    windowWidth < 500? 100: 35; // window size
    if (windowWidth > 1500)
        return 30;
    else if (windowWidth > 1200)
        return 45;
    else if (windowWidth > 700)
        return 50;
    else 
        return 100;
}

function toggleMenu(divID) {
    let obj = {
      "help-div": false,
      "setting-div" : false,
      "tasks-div"   : false,
    }
    if (obj.hasOwnProperty(divID))
      obj[divID] = true;
    for(const key in obj) {
      if (obj[key] === true)
      {
        const sideBarWidth = 70; // px 
        let divWidth = 100; // %
        let windowWidth = window.innerWidth;
        // 
        let sideBarWidthPercentage = Math.round(sideBarWidth/windowWidth * 100);
        divWidth = setdivWidth(windowWidth);
          
        document.getElementById(key).style.width = `${divWidth-sideBarWidthPercentage}%`; 
        document.getElementById(key).style.padding = `60px 0% 0px ${sideBarWidthPercentage}%`;
      }
      else {
        document.getElementById(key).style.width = "0"; 
        document.getElementById(key).style.padding = "0";
      }
    }
    
  }
  
function setButtons (btnID) {
let buttons = {
    "help-icon": false,
    "setting-icon" : false,
    "tasks-icon"   : false,
}
    if (buttons.hasOwnProperty(btnID))
    buttons[btnID] = true;
for(const key in buttons) {
    if (buttons[key])
        document.getElementById(key).classList.add("button-clicked");
    else
        document.getElementById(key).classList.remove("button-clicked");
}
}
  
  
document.querySelectorAll(".menu-icon").forEach((elem) => {
elem.addEventListener("click", (event) => {
    const id = elem.getAttribute("data-associated-div");
    let side = document.getElementById(id).offsetWidth;
    if (side === 0) {
    toggleMenu(id);
    setButtons(elem.getAttribute("id"));
    }
    else {
    toggleMenu(null);
    setButtons(null)
    }
})
})
  
  