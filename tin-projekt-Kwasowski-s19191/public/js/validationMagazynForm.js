function validateForm() {

    const nazwaInput = document.getElementById('Nazwa');
    const adresInput = document.getElementById('Adres');

    const errorName = document.getElementById('errorName');
    const errorAdress = document.getElementById('errorAdress');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([nazwaInput, adresInput], [errorName, errorAdress], errorsSummary);

    let valid = true;

    if (!checkRequired(nazwaInput.value)) {
        valid = false;
        nazwaInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nazwaInput.value, 2, 60)) {
        valid = false;
        nazwaInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(adresInput.value)) {
        valid = false;
        adresInput.classList.add("error-input");
        errorAdress.innerText = "Pole jest wymagane";
    } else if (!checkAdress(adresInput.value)) {
        valid = false;
        adresInput.classList.add("error-input");
        errorAdress.innerText = "Pole powinno zawierać adres w formacie np. ul. Gorka 14C";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}