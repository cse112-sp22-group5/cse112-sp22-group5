/* eslint no-undef: "off" */
/**
 * @name googleTranslateElementInit
 * @function
 * @description Initiate google translation
 */
export function googleTranslateElementInit() {
    new google.translate.TranslateElement({
    pageLanguage: 'en'
    }, 'google-translate-element');
}