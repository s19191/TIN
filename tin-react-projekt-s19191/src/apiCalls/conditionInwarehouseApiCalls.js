const booksBaseUrl = 'http://localhost:3000/api/stanWMagazynie';

export function getConditionsInwarehousesApiCall() {
    const promise = fetch(booksBaseUrl);
    return promise;
}

export function getConditionInwarehouseByIdApiCall(swmId) {
    const url = `${booksBaseUrl}/${swmId}`;
    const promise = fetch(url);
    return promise;
}