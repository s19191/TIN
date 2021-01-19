function validateForm() {

    const nazwaInput = document.getElementById('Nazwa');
    const adresInput = document.getElementById('Adres');

    const errorName = document.getElementById('errorName');
    const errorAdress = document.getElementById('errorAdress');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([nazwaInput, adresInput], [errorName, errorAdress], errorsSummary);

    let valid = true;

    if (!checkRequired(nazwaInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        nazwaInput.classList.add("error-input");
        errorName.innerText = reqMessage;
    } else if (!checkTextLengthRange(nazwaInput.value, 2, 60)) {
        const reqMessage = document.getElementById('errorMessage-between2and60').innerText;
        valid = false;
        nazwaInput.classList.add("error-input");
        errorName.innerText = reqMessage;
    }

    if (!checkRequired(adresInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        adresInput.classList.add("error-input");
        errorAdress.innerText = reqMessage;
    } else if (!checkAdress(adresInput.value)) {
        const reqMessage = document.getElementById('errorMessage-between2and60').innerText;
        valid = false;
        adresInput.classList.add("error-input");
        errorAdress.innerText = reqMessage;
        // TODO: coś tu nie działa
        // errorAdress.innerText = "Pole powinno zawierać adres w formacie np. ul. Gorka 14C";
    }

    if (!valid) {
        const reqMessage = document.getElementById('errorMessage-formsErrors').innerText;
        errorsSummary.innerText = reqMessage;
    }

    return valid;
}