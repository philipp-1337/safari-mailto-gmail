const TEXT = {
    en: {
        iconAlt: "MailtoToGmail icon",
        unknownPreferences: "You can turn on MailtoToGmail's extension in Safari Extensions preferences.",
        onPreferences: "MailtoToGmail's extension is currently on. You can turn it off in Safari Extensions preferences.",
        offPreferences: "MailtoToGmail's extension is currently off. You can turn it on in Safari Extensions preferences.",
        buttonPreferences: "Quit and Open Safari Extensions Preferences...",
        unknownSettings: "You can turn on MailtoToGmail's extension in the Extensions section of Safari Settings.",
        onSettings: "MailtoToGmail's extension is currently on. You can turn it off in the Extensions section of Safari Settings.",
        offSettings: "MailtoToGmail's extension is currently off. You can turn it on in the Extensions section of Safari Settings.",
        buttonSettings: "Quit and Open Safari Settings..."
    },
    de: {
        iconAlt: "MailtoToGmail-Symbol",
        unknownPreferences: "Du kannst die MailtoToGmail-Erweiterung in den Safari-Erweiterungseinstellungen aktivieren.",
        onPreferences: "Die MailtoToGmail-Erweiterung ist derzeit aktiviert. Du kannst sie in den Safari-Erweiterungseinstellungen deaktivieren.",
        offPreferences: "Die MailtoToGmail-Erweiterung ist derzeit deaktiviert. Du kannst sie in den Safari-Erweiterungseinstellungen aktivieren.",
        buttonPreferences: "Beenden und Safari-Erweiterungseinstellungen öffnen...",
        unknownSettings: "Du kannst die MailtoToGmail-Erweiterung im Bereich Erweiterungen in den Safari-Einstellungen aktivieren.",
        onSettings: "Die MailtoToGmail-Erweiterung ist derzeit aktiviert. Du kannst sie im Bereich Erweiterungen in den Safari-Einstellungen deaktivieren.",
        offSettings: "Die MailtoToGmail-Erweiterung ist derzeit deaktiviert. Du kannst sie im Bereich Erweiterungen in den Safari-Einstellungen aktivieren.",
        buttonSettings: "Beenden und Safari-Einstellungen öffnen..."
    }
};

function getLocale() {
    const language = (navigator.language || "en").toLowerCase();
    return language.startsWith("de") ? "de" : "en";
}

function applyLocalizedText(useSettingsInsteadOfPreferences) {
    const locale = getLocale();
    const t = TEXT[locale] || TEXT.en;

    const icon = document.querySelector("img.app-icon");
    if (icon) {
        icon.alt = t.iconAlt;
    }

    document.getElementsByClassName("state-on")[0].innerText = useSettingsInsteadOfPreferences
        ? t.onSettings
        : t.onPreferences;

    document.getElementsByClassName("state-off")[0].innerText = useSettingsInsteadOfPreferences
        ? t.offSettings
        : t.offPreferences;

    document.getElementsByClassName("state-unknown")[0].innerText = useSettingsInsteadOfPreferences
        ? t.unknownSettings
        : t.unknownPreferences;

    document.getElementsByClassName("open-preferences")[0].innerText = useSettingsInsteadOfPreferences
        ? t.buttonSettings
        : t.buttonPreferences;
}

function show(enabled, useSettingsInsteadOfPreferences) {
    applyLocalizedText(useSettingsInsteadOfPreferences);

    if (typeof enabled === "boolean") {
        document.body.classList.toggle("state-on", enabled);
        document.body.classList.toggle("state-off", !enabled);
    } else {
        document.body.classList.remove("state-on");
        document.body.classList.remove("state-off");
    }
}

function openPreferences() {
    webkit.messageHandlers.controller.postMessage("open-preferences");
}

document.querySelector("button.open-preferences").addEventListener("click", openPreferences);
applyLocalizedText(false);
