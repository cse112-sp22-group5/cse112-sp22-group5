export function googleTranslateElementInit() {
    const tag = document.getElementById("google_translate_element");
    new google.translate.TranslateElement({
    pageLanguage: 'en'
    }, 'google-translate-element');
}