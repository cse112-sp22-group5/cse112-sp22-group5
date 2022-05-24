let /** @type {number} **/
  CURRENT_TRACK_INDX = 0,
  /** @type {string[]} */
  CURRENT_TRACKS = [];

// TO-DO: Find a better place to store the audio files
const /** @type {string[][]} */
  LOFI_TRACKS = [
    [
      "../../source/audio/HoliznaCC0-Letting-Go-Of-The-Past.mp3",
      "Letting Go of the Past by HoliznaCC0",
    ],
    ["../../source/audio/HoliznaCC0-Ghosts.mp3", "Ghosts by HoliznaCC0"], // 1st track played
  ],
  /** @type {string[][]} */
  CLASSICAL_TRACKS = [
    [
      "../../source/audio/Waltz-Tchaikovsky-Op40.mp3",
      "Waltz (Tchaikovsky Op. 40) by Kevin MacLeod",
    ], // 1st track played
  ];

/**
 * @name setBackgroundMusic
 * @function
 * @description Sets the background music based on user selection
 */
function setBackgroundMusic() {
  let bgMusic = document.getElementById("bg-music");
  let currentMix = document.getElementById("current-mix");
  let prevTrackBtn = document.getElementById("prevTrackButton");
  let nxtTrackBtn = document.getElementById("nxtTrackButton");
  let bgAudio = document.getElementById("background-audio");

  // No backround music
  if (bgMusic.options[bgMusic.selectedIndex].text == "None") {
    currentMix.style.display = "none";
    bgAudio.pause();
    bgAudio.style.display = "none";
    return;
  }

  CURRENT_TRACK_INDX = 0;
  if (bgMusic.options[bgMusic.selectedIndex].text == "Lofi") {
    CURRENT_TRACKS = LOFI_TRACKS;
  } else if (bgMusic.options[bgMusic.selectedIndex].text == "Classical") {
    CURRENT_TRACKS = CLASSICAL_TRACKS;
  }
  currentMix.style.display = "block";
  bgAudio.style.display = "block";
  setTrackToNext();
  prevTrackBtn.addEventListener("click", setTrackToPrev);
  nxtTrackBtn.addEventListener("click", setTrackToNext);
  bgAudio.addEventListener("ended", setTrackToNext);
}

/**
 * @name setTrackToNext
 * @function
 * @description plays the next track
 */
function setTrackToNext() {
  let bgAudio = document.getElementById("background-audio");
  let currentTrackName = document.getElementById("track-name");
  bgAudio.pause();
  CURRENT_TRACK_INDX = (CURRENT_TRACK_INDX + 1) % CURRENT_TRACKS.length;
  bgAudio.setAttribute("src", CURRENT_TRACKS[CURRENT_TRACK_INDX][0]);
  bgAudio.play();
  currentTrackName.innerHTML = CURRENT_TRACKS[CURRENT_TRACK_INDX][1]; // display the track name
}

/**
 * @name setTrackToPrev
 * @function
 * @description plays the previous track
 */
function setTrackToPrev() {
  let bgAudio = document.getElementById("background-audio");
  let currentTrackName = document.getElementById("track-name");
  bgAudio.pause();
  CURRENT_TRACK_INDX = CURRENT_TRACK_INDX - 1;
  if (CURRENT_TRACK_INDX < 0) {
    CURRENT_TRACK_INDX = CURRENT_TRACKS.length - 1;
  }
  bgAudio.setAttribute("src", CURRENT_TRACKS[CURRENT_TRACK_INDX][0]);
  bgAudio.play();
  currentTrackName.innerHTML = CURRENT_TRACKS[CURRENT_TRACK_INDX][1]; // display the track name
}

// export functions and variables for testing
export { setBackgroundMusic };
