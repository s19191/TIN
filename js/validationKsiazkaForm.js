function validateForm() {

    const tytulInput = document.getElementById('tytul');
    const autorInput = document.getElementById('autor');
    const dataWydaniaInput = document.getElementById('dataWydania');

    const errorTytul = document.getElementById('errorTytul');
    const errorAutor = document.getElementById('errorAutor');
    const errorDataWydania = document.getElementById('errorDataWydania');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([tytulInput, autorInput, dataWydaniaInput], [errorTytul, errorAutor, errorDataWydania], errorsSummary);

    let valid = true;

    if (!checkRequired(tytulInput.value)) {
        valid = false;
        tytulInput.classList.add("error-input");
        errorTytul.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(tytulInput.value, 2, 60)) {
        valid = false;
        tytulInput.classList.add("error-input");
        errorTytul.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(autorInput.value)) {
        valid = false;
        autorInput.classList.add("error-input");
        errorAutor.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(autorInput.value, 2, 60)) {
        valid = false;
        autorInput.classList.add("error-input");
        errorAutor.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(dataWydaniaInput.value)) {
        valid = false;
        dataWydaniaInput.classList.add("error-input");
        errorDataWydania.innerText = "Pole jest wymagane";
        // czy nastpęna część jest potrzebna co do typu date, gdzie nie da się nic innego wpisać
    } else if (!checkDate(dataWydaniaInput.value)) {
        valid = false;
        dataWydaniaInput.classList.add("error-input");
        errorDataWydania.innerText = "Pole powinno zawierać datę w formacie dd.MM.yyyy (np. 01.01.2000)";
    } else if (checkDateIfAfter(dataWydaniaInput.value, nowString)) {
        valid = false;
        dataWydaniaInput.classList.add("error-input");
        errorDataWydania.innerText = "Data nie może być z przyszłości";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}