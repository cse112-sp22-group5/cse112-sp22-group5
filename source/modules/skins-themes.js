import { saveToStorage, retrieveDataFromStorage } from "./localStorage.js";
import { updateProgress } from "./progress-bar.js";

const BackgroundImages = [
  "https://wallpaperaccess.com/full/274198.jpg",
  "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg",
  "https://images.pexels.com/photos/884788/pexels-photo-884788.jpeg",
  "https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg",
];

const Themes = {
  1: "default-theme",
  2: "dark-theme",
  3: "light-theme",
  4: "color-blind",
};

// LocalStorage Key
const promoThemes = "promoThemes";

// LocalStorage Value
const promoThemesSetting = {
  theme: {
    isOn: false,
    source: "",
  },
  backgroundImage: {
    isOn: false,
    source: "",
  },
};

/**
 * @name setPromoThemes
 * @function
 * @description Set the correct theme and return an object that stores this infomation
 * @param {string} type type of theme, is it from theme or background images
 * @param {string} value value or source of this theme
 * @returns an object that stores this infomation about themes
 */
function setPromoThemes(type, value) {
  const promoThemesCopy = JSON.parse(JSON.stringify(promoThemesSetting));
  promoThemesCopy[type]["isOn"] = true;
  promoThemesCopy[type]["source"] = value;
  return promoThemesCopy;
}

/**
 * @name setTheme
 * @function
 * @description set theme for the app base on user selection
 * @param {HTMLElement} target the target Element
 * @param {string} theme the position of theme in the global variable Themes
 */
function setTheme(target, theme) {
  target.className = Themes[theme];
  updateProgress();
  saveToStorage(promoThemes, setPromoThemes("theme", theme));
}

/**
 * @name loadThemeFromStorage
 * @description load the theme from storage, if user already set a theme or background
 * then change to it, otherwise load the default theme
 */
function loadThemeFromStorage() {
  const target = document.documentElement;
  const loadTheme = retrieveDataFromStorage(promoThemes);
  target.className = "default-theme";
  for (const key in loadTheme) {
    if (loadTheme[key]["isOn"])
      switch (key) {
        case "theme":
          if (loadTheme[key]["source"] === "4")
            document.getElementById("color-blindness").value = "4";
          else
            document.getElementById("theme").value = loadTheme[key]["source"];

          setTheme(target, loadTheme[key]["source"]);
          break;
        case "backgroundImage":
          document.body.style.backgroundImage = `url('${loadTheme[key]["source"]}')`;
          break;
      }
  }
}

/**
 * @name loadBackgroundImages
 * @description load background images for styles/themes panel
 */
function loadBackgroundImages() {
  const container = document.querySelector("#background-images");
  for (let i = 0; i < BackgroundImages.length; i++) {
    let gridItem = `
        <div class='grid-item'>
            <img src='./img/background/bg-${i}.jpg'>
            <input type='radio' value='${i}' name='bgImg'>
        </div>
        `;
    container.innerHTML += gridItem;
  }
}

/**
 * @name setBGImage
 * @description Add event for background images, so when they are clicked
 * background changes
 */
function setBGImage() {
  document.querySelectorAll("input[name='bgImg']").forEach((img) => {
    img.addEventListener("click", (event) => {
      const index = parseInt(event.target.value, 10);
      document.body.style.backgroundImage = `url('${BackgroundImages[index]}')`;
      saveToStorage(
        promoThemes,
        setPromoThemes("backgroundImage", BackgroundImages[index])
      );
    });
  });
}

/**
 * @name setBGFromURL
 * @description set background image to the URL user input
 * @param {string} url URL to an Image
 */
function setBGFromURL(url) {
  document.body.style.backgroundImage = `url('${url}')`;
}

/**
 * @name setDefaultThemes
 * @description Reset Syles/Themes setting to default
 */
function setDefaultThemes() {
  const body = document.documentElement;
  const defaultTheme = {
    theme: "1",
    "color-blindness": "1",
    "bg-url": "",
  };
  for (const key in defaultTheme) {
    document.getElementById(key).value = defaultTheme[key];
  }
  document.body.style.backgroundImage = "";
  setTheme(body, 1);
}

export {
  setTheme,
  loadThemeFromStorage,
  loadBackgroundImages,
  setBGImage,
  setBGFromURL,
  setDefaultThemes,
};
