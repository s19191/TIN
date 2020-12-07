function validateForm() {

    const magazynInput = document.getElementById('magazyn');
    const ksiazkaInput = document.getElementById('ksiazka');
    const iloscNaStanieInput = document.getElementById('iloscNaStanie');
    const cenaHurtowaInput = document.getElementById('cenaHurtowa');
    const minilamnaIloscDoCenyHurtowejInput = document.getElementById('minilamnaIloscDoCenyHurtowej');
    const cenaDetalicznaInput = document.getElementById('cenaDetaliczna');

    const errorMagazyn = document.getElementById('errorMagazyn');
    const errorKsiazka = document.getElementById('errorKsiazka');
    const errorIloscNaStanie = document.getElementById('errorIloscNaStanie');
    const errorCenaHurtowa = document.getElementById('errorCenaHurtowa');
    const errorMinilamnaIloscDoCenyHurtowej = document.getElementById('errorMinilamnaIloscDoCenyHurtowej');
    const errorCenaDetaliczna = document.getElementById('errorCenaDetaliczna');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([magazynInput, ksiazkaInput, iloscNaStanieInput, cenaHurtowaInput, minilamnaIloscDoCenyHurtowejInput, cenaDetalicznaInput], [errorMagazyn, errorKsiazka, errorIloscNaStanie, errorCenaHurtowa, errorMinilamnaIloscDoCenyHurtowej, errorCenaDetaliczna], errorsSummary);

    let valid = true;

    if (!checkRequired(magazynInput.value)) {
        valid = false;
        magazynInput.classList.add("error-input");
        errorMagazyn.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(ksiazkaInput.value)) {
        valid = false;
        ksiazkaInput.classList.add("error-input");
        errorKsiazka.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(iloscNaStanieInput.value)) {
        valid = false;
        iloscNaStanieInput.classList.add("error-input");
        errorIloscNaStanie.innerText = "Pole jest wymagane";
    } else if (!checkNumber(iloscNaStanieInput.value)) {
        valid = false;
        iloscNaStanieInput.classList.add("error-input");
        errorIloscNaStanie.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(iloscNaStanieInput.value, 0)) {
        valid = false;
        iloscNaStanieInput.classList.add("error-input");
        errorIloscNaStanie.innerText = "Pole powinno być liczbą dodatnią";
    }

    if (!checkNumber(cenaHurtowaInput.value)) {
        valid = false;
        cenaHurtowaInput.classList.add("error-input");
        errorCenaHurtowa.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(cenaHurtowaInput.value, 0)) {
        valid = false;
        cenaHurtowaInput.classList.add("error-input");
        errorCenaHurtowa.innerText = "Pole powinno być liczbą dodatnią";
    }

    if (!checkNumber(minilamnaIloscDoCenyHurtowejInput.value)) {
        valid = false;
        minilamnaIloscDoCenyHurtowejInput.classList.add("error-input");
        errorMinilamnaIloscDoCenyHurtowej.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(minilamnaIloscDoCenyHurtowejInput.value, 0)) {
        valid = false;
        minilamnaIloscDoCenyHurtowejInput.classList.add("error-input");
        errorMinilamnaIloscDoCenyHurtowej.innerText = "Pole powinno być liczbą dodatnią";
    }

    if (!checkRequired(cenaDetalicznaInput.value)) {
        valid = false;
        cenaDetalicznaInput.classList.add("error-input");
        errorCenaDetaliczna.innerText = "Pole jest wymagane";
    } else if (!checkNumber(cenaDetalicznaInput.value)) {
        valid = false;
        cenaDetalicznaInput.classList.add("error-input");
        errorCenaDetaliczna.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(cenaDetalicznaInput.value, 0)) {
        valid = false;
        cenaDetalicznaInput.classList.add("error-input");
        errorCenaDetaliczna.innerText = "Pole powinno być liczbą dodatnią";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}