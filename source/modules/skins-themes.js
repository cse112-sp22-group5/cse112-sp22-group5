// import {setObj, storeToLocal, removeDataFromStorage, retrieveDataFromStorage, deleteFromLocal}
// from './localStorage.js';
import { updateProgress } from "./progress-bar.js";

const BackgroundImages = [
  "img/icons/no-image-icon.svg",
  "https://wallpaperaccess.com/full/274198.jpg",
  "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/884788/pexels-photo-884788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const Themes = {
  1: "default-theme",
  2: "dark-theme",
  3: "light-theme",
  4: "color-blind",
};

function setTheme(target, theme) {
  target.className = Themes[theme];
  updateProgress();

  if (document.getElementById("color-blindness").value == 4) {
    target.className = Themes[4];
    updateProgress();
  }
}

function loadThemeFromStorage(target) {
  console.log(target);
}

function loadBackgroundImages() {
  const container = document.querySelector("#background-images");
  for (let i = 0; i < BackgroundImages.length; i++) {
    let gridItem = `
        <div class='grid-item'>
            <img src='${BackgroundImages[i]}'>
            <input type='radio' value='${i}' name='bgImg'>
        </div>
        `;
    container.innerHTML += gridItem;
  }
}

function setBGImage() {
  document.querySelectorAll("input[name='bgImg']").forEach((img) => {
    img.addEventListener("click", (event) => {
      const index = parseInt(event.target.value, 10);
      if (index === 0) document.body.style.backgroundImage = "";
      else
        document.body.style.backgroundImage = `url('${BackgroundImages[index]}')`;
    });
  });
}

export { setTheme, loadThemeFromStorage, loadBackgroundImages, setBGImage };
