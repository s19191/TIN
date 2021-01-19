function validateForm() {

    const ksiazka_Id_KsiazkaInput = document.getElementById('Ksiazka_Id_Ksiazka');
    const magazyn_Id_MagazynInput = document.getElementById('Magazyn_Id_Magazyn');
    const iloscNaStanieInput = document.getElementById('IloscNaStanie');
    const cenaHurtowaInput = document.getElementById('CenaHurtowa');
    const minilamnaIloscDoCenyHurtowejInput = document.getElementById('MinimalnaIloscDoCenyHurtowej');
    const cenaDetalicznaInput = document.getElementById('CenaDetaliczna');

    const errorKsiazka_Id_Ksiazka = document.getElementById('errorKsiazka_Id_Ksiazka');
    const errorMagazyn_Id_Magazyn = document.getElementById('errorMagazyn_Id_Magazyn');
    const errorIloscNaStanie = document.getElementById('errorIloscNaStanie');
    const errorCenaHurtowa = document.getElementById('errorCenaHurtowa');
    const errorMinilamnaIloscDoCenyHurtowej = document.getElementById('errorMinilamnaIloscDoCenyHurtowej');
    const errorCenaDetaliczna = document.getElementById('errorCenaDetaliczna');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([magazyn_Id_MagazynInput, ksiazka_Id_KsiazkaInput, iloscNaStanieInput, cenaHurtowaInput, minilamnaIloscDoCenyHurtowejInput, cenaDetalicznaInput], [errorMagazyn_Id_Magazyn, errorKsiazka_Id_Ksiazka, errorIloscNaStanie, errorCenaHurtowa, errorMinilamnaIloscDoCenyHurtowej, errorCenaDetaliczna], errorsSummary);

    let valid = true;

    if (!checkRequired(magazyn_Id_MagazynInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        magazyn_Id_MagazynInput.classList.add("error-input");
        errorMagazyn_Id_Magazyn.innerText = reqMessage;
    }

    if (!checkRequired(ksiazka_Id_KsiazkaInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        ksiazka_Id_KsiazkaInput.classList.add("error-input");
        errorKsiazka_Id_Ksiazka.innerText = reqMessage;
    }

    if (!checkRequired(iloscNaStanieInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        iloscNaStanieInput.classList.add("error-input");
        errorIloscNaStanie.innerText = reqMessage;
    } else if (!checkNumber(iloscNaStanieInput.value)) {
        const reqMessage = document.getElementById('errorMessage-isNumber').innerText;
        valid = false;
        iloscNaStanieInput.classList.add("error-input");
        errorIloscNaStanie.innerText = reqMessage;
    } else if (!checkNumberRange(iloscNaStanieInput.value, 0)) {
        const reqMessage = document.getElementById('errorMessage-isNumberPlus').innerText;
        valid = false;
        iloscNaStanieInput.classList.add("error-input");
        errorIloscNaStanie.innerText = reqMessage;
    }

    if (!checkNumber(cenaHurtowaInput.value) && checkRequired(cenaHurtowaInput.value)) {
        const reqMessage = document.getElementById('errorMessage-isNumber').innerText;
        valid = false;
        cenaHurtowaInput.classList.add("error-input");
        errorCenaHurtowa.innerText = reqMessage;
    } else if (!checkNumberRange(cenaHurtowaInput.value, 0) && checkRequired(cenaHurtowaInput.value)) {
        const reqMessage = document.getElementById('errorMessage-isNumberPlus').innerText;
        valid = false;
        cenaHurtowaInput.classList.add("error-input");
        errorCenaHurtowa.innerText = reqMessage;
    }

    if (!checkNumber(minilamnaIloscDoCenyHurtowejInput.value) && checkRequired(cenaHurtowaInput.value)) {
        const reqMessage = document.getElementById('errorMessage-isNumber').innerText;
        valid = false;
        minilamnaIloscDoCenyHurtowejInput.classList.add("error-input");
        errorMinilamnaIloscDoCenyHurtowej.innerText = reqMessage;
    } else if (!checkNumberRange(minilamnaIloscDoCenyHurtowejInput.value, 0) && checkRequired(cenaHurtowaInput.value)) {
        const reqMessage = document.getElementById('errorMessage-isNumberPlus').innerText;
        valid = false;
        minilamnaIloscDoCenyHurtowejInput.classList.add("error-input");
        errorMinilamnaIloscDoCenyHurtowej.innerText = reqMessage;
    }

    if (!checkRequired(cenaDetalicznaInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        cenaDetalicznaInput.classList.add("error-input");
        errorCenaDetaliczna.innerText = reqMessage;
    } else if (!checkNumber(cenaDetalicznaInput.value)) {
        const reqMessage = document.getElementById('errorMessage-isNumber').innerText;
        valid = false;
        cenaDetalicznaInput.classList.add("error-input");
        errorCenaDetaliczna.innerText = reqMessage;
    } else if (!checkNumberRange(cenaDetalicznaInput.value, 0)) {
        const reqMessage = document.getElementById('errorMessage-isNumberPlus').innerText;
        valid = false;
        cenaDetalicznaInput.classList.add("error-input");
        errorCenaDetaliczna.innerText = reqMessage;
    }

    if (!valid) {
        const reqMessage = document.getElementById('errorMessage-formsErrors').innerText;
        errorsSummary.innerText = reqMessage;
    }

    return valid;
}