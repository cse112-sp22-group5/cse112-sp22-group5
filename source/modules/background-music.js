let 
    /** @type {number} **/ 
    CURRENT_TRACK_INDX = 0,
    /** @type {string[]} */
    CURRENT_TRACKS = [];

const
    /** @type {string[][]} */
    LOFI_TRACKS = [
        ['./audio/HoliznaCC0-Nowhere-To-Be-Nothing-To-Do.mp3', 'Nowhere To Be, Nothing To Do by HoliznaCC0'],
        ['./audio/Audiobinger-City-Lights.mp3', 'City Lights by Audiobinger'], // 1st track played
        ['./audio/HoliznaCC0-Sense-Of-Purpose.mp3', 'Sense Of Purpose by HoliznaCC0'],
        ['./audio/HoliznaCC0-Ghosts.mp3', 'Ghosts by HoliznaCC0'],
        ['./audio/HoliznaCC0-Letting-Go-Of-The-Past.mp3', 'Letting Go Of The Past by HoliznaCC0']
    ],
    /** @type {string[][]} */
    CLASSICAL_TRACKS = [
        ['./audio/Erik-Satie-Gymnopedie-No1.mp3', 'Satie - Gymnopedie No. 1 by MacLeod'],
        ['./audio/Tchaikovsky-Waltz-No9-Op40.mp3', 'Tchaikovsky - Waltz No. 9 Op. 40 by MacLeod'], // 1st track played
        ['./audio/Mozart-Piano-Sonata-in-B-flat major-III-Allegretto-Grazioso.mp3', 'Mozart - Piano Sonata No. 13, K. 333 III. by Kinsella']
    ];

/**
 * @name setBackgroundMusic
 * @function
 * @description Sets the background music based on user selection
 */
function setBackgroundMusic() {
    let bgMusic = document.getElementById('bg-music');
    let currentMix = document.getElementById('current-mix');
    let prevTrackBtn = document.getElementById('prevTrackButton');
    let nxtTrackBtn = document.getElementById('nxtTrackButton');
    let bgAudio = document.getElementById('background-audio');

    // No backround music
    if(bgMusic.options[bgMusic.selectedIndex].text == 'None') {
        currentMix.style.display = 'none';
        bgAudio.pause();
        bgAudio.style.display = 'none';
        return;
    }

    CURRENT_TRACK_INDX = 0;
    if (bgMusic.options[bgMusic.selectedIndex].text == 'Lofi') {
        CURRENT_TRACKS = LOFI_TRACKS;
    } else if (bgMusic.options[bgMusic.selectedIndex].text == 'Classical') {
        CURRENT_TRACKS = CLASSICAL_TRACKS;
    }
    currentMix.style.display = 'block';
    bgAudio.style.display = 'block';
    setTrackToNext();
    prevTrackBtn.addEventListener('click', setTrackToPrev);
    nxtTrackBtn.addEventListener('click', setTrackToNext);
    bgAudio.addEventListener('ended', setTrackToNext);
}

/**
 * @name setTrackToNext
 * @function
 * @description plays the next track
 */
function setTrackToNext() {
    let bgAudio = document.getElementById('background-audio');
    let currentTrackName = document.getElementById('track-name');
    bgAudio.pause();
    CURRENT_TRACK_INDX = (CURRENT_TRACK_INDX + 1) % CURRENT_TRACKS.length;
    bgAudio.setAttribute('src', CURRENT_TRACKS[CURRENT_TRACK_INDX][0]); 
    let playSuccess = bgAudio.play();
    if (playSuccess !== undefined) {
        playSuccess.then(_ => {
            // Autoplay started!
            currentTrackName.innerHTML = CURRENT_TRACKS[CURRENT_TRACK_INDX][1]; // display the track name
        }).catch(error => {
            // Autoplay was prevented.
            currentTrackName.innerHTML = 'Error playing track'; // display error
        });
    }
}

/**
 * @name setTrackToPrev
 * @function
 * @description plays the previous track
 */
function setTrackToPrev() {
    let bgAudio = document.getElementById('background-audio');
    let currentTrackName = document.getElementById('track-name');
    bgAudio.pause();
    CURRENT_TRACK_INDX = CURRENT_TRACK_INDX - 1;
    if (CURRENT_TRACK_INDX < 0) {
        CURRENT_TRACK_INDX = CURRENT_TRACKS.length - 1;
    }
    bgAudio.setAttribute('src', CURRENT_TRACKS[CURRENT_TRACK_INDX][0]);  
    let playSuccess = bgAudio.play();
    if (playSuccess !== undefined) {
        playSuccess.then(_ => {
            // Autoplay started!
            currentTrackName.innerHTML = CURRENT_TRACKS[CURRENT_TRACK_INDX][1]; // display the track name
        }).catch(error => {
            // Autoplay was prevented.
            currentTrackName.innerHTML = 'Error playing track'; // display error
        });
    }
}

// export functions and variables for testing
export { setBackgroundMusic };