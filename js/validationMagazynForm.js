function validateForm() {

    const nameInput = document.getElementById('name');
    const adressInput = document.getElementById('adress');

    const errorName = document.getElementById('errorName');
    const errorAdress = document.getElementById('errorAdress');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([nameInput, adressInput], [errorName, errorAdress], errorsSummary);

    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nameInput.value, 2, 60)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(adressInput.value)) {
        valid = false;
        adressInput.classList.add("error-input");
        errorAdress.innerText = "Pole jest wymagane";
    } else if (!checkAdress(adressInput.value)) {
        valid = false;
        adressInput.classList.add("error-input");
        errorAdress.innerText = "Pole powinno zawierać adres w formacie np. ul. Gorka 14C";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}