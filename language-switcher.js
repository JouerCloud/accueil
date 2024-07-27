((myGlobal) => {
    let lang = computedLanguage();

    function computedLanguage() {
        return navigator.language.substr(0, 2) || 'fr';
    }

    function chooseLanguageManually(evt) {
        let selectedLanguage = evt.target.getAttribute("hreflang");
        execute(selectedLanguage, false);
        this.removeEventListener("click", chooseLanguageManually);
    }

    function execute(givenLang, useComputedLanguage) {
        lang = useComputedLanguage ? computedLanguage() : givenLang;
        // If explicity want English page and we are not there yet, redirect to English page
        if ((lang === 'en') && !myGlobal.location.pathname.startsWith('/index-en.html')) {
            myGlobal.history.push('/index-en.html');
        } else if ((lang === 'fr') && !myGlobal.location.pathname.startsWith('/index.html')) { // any other non supported language yet defaults to French page if not yet set
            myGlobal.history.push('/index.html');
        } else {
            myGlobal.history.pop();
        }
    }

    myGlobal.document.querySelectorAll(".switcher__lang a").forEach((item) => {
        item.addEventListener("click", chooseLanguageManually);
    });

    execute(lang, true);
})(window);
