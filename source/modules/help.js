/**
 * @name revealHelp
 * @function
 * @description Opens the help modal when the help button is clicked
 */
function revealHelp() {
    const helpModal = document.getElementById('help-modal');
    helpModal.showModal();
}

/**
 * @name hideHelp
 * @function
 * @description Closes the help modal when the 'x' inside the modal or anywhere outside of the modal is clicked
 */
function hideHelp() {
    const helpModal = document.getElementById('help-modal');
    helpModal.close();
}

// export functions for testing
export { revealHelp, hideHelp };
