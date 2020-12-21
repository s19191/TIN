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
        valid = false;
        magazyn_Id_MagazynInput.classList.add("error-input");
        errorMagazyn_Id_Magazyn.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(ksiazka_Id_KsiazkaInput.value)) {
        valid = false;
        ksiazka_Id_KsiazkaInput.classList.add("error-input");
        errorKsiazka_Id_Ksiazka.innerText = "Pole jest wymagane";
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

    if (!checkNumber(cenaHurtowaInput.value) && checkRequired(cenaHurtowaInput.value)) {
        console.log(cenaHurtowaInput.value);
        valid = false;
        cenaHurtowaInput.classList.add("error-input");
        errorCenaHurtowa.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(cenaHurtowaInput.value, 0) && checkRequired(cenaHurtowaInput.value)) {
        valid = false;
        cenaHurtowaInput.classList.add("error-input");
        errorCenaHurtowa.innerText = "Pole powinno być liczbą dodatnią";
    }

    if (!checkNumber(minilamnaIloscDoCenyHurtowejInput.value) && checkRequired(cenaHurtowaInput.value)) {
        valid = false;
        minilamnaIloscDoCenyHurtowejInput.classList.add("error-input");
        errorMinilamnaIloscDoCenyHurtowej.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(minilamnaIloscDoCenyHurtowejInput.value, 0) && checkRequired(cenaHurtowaInput.value)) {
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