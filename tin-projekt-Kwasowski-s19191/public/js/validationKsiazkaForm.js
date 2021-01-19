function validateForm() {

    const tytulInput = document.getElementById('Tytul');
    const autorInput = document.getElementById('Autor');
    const dataWydaniaInput = document.getElementById('DataWydania');

    const errorTytul = document.getElementById('errorTytul');
    const errorAutor = document.getElementById('errorAutor');
    const errorDataWydania = document.getElementById('errorDataWydania');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([tytulInput, autorInput, dataWydaniaInput], [errorTytul, errorAutor, errorDataWydania], errorsSummary);

    let valid = true;

    if (!checkRequired(tytulInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        tytulInput.classList.add("error-input");
        errorTytul.innerText = reqMessage;
    } else if (!checkTextLengthRange(tytulInput.value, 2, 60)) {
        const reqMessage = document.getElementById('errorMessage-between2and60').innerText;
        valid = false;
        tytulInput.classList.add("error-input");
        errorTytul.innerText = reqMessage;
    }

    if (!checkRequired(autorInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        autorInput.classList.add("error-input");
        errorAutor.innerText = reqMessage;
    } else if (!checkTextLengthRange(autorInput.value, 2, 60)) {
        const reqMessage = document.getElementById('errorMessage-between2and60').innerText;
        valid = false;
        autorInput.classList.add("error-input");
        errorAutor.innerText = reqMessage;
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
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        dataWydaniaInput.classList.add("error-input");
        errorDataWydania.innerText = reqMessage;
    } else if (!checkDate(dataWydaniaInput.value)) {
        const reqMessage = document.getElementById('errorMessage-correctDateFormat').innerText;
        valid = false;
        dataWydaniaInput.classList.add("error-input");
        errorDataWydania.innerText = reqMessage;
    } else if (checkDateIfAfter(dataWydaniaInput.value, nowString)) {
        const reqMessage = document.getElementById('errorMessage-notFutureDate').innerText;
        valid = false;
        dataWydaniaInput.classList.add("error-input");
        errorDataWydania.innerText = reqMessage;
    }

    if (!valid) {
        const reqMessage = document.getElementById('errorMessage-Errors').innerText;
        errorsSummary.innerText = reqMessage;
    }

    return valid;
}