import {setObj, storeToLocal, removeDataFromStorage, retrieveDataFromStorage, deleteFromLocal}
from './localStorage.js';

function setTheme(target, theme) {
    if (theme == 1) {
        target.className = 'theme-default';
    }
    else if (theme == 2) {
        target.className = 'theme-black';
    }
    else if (theme == 3) {
        target.className = 'theme-white';
    }
}

function loadThemeFromStorage(target) {

}

export {setTheme, loadThemeFromStorage};