const booksBaseUrl = 'http://localhost:3000/api/magazyny';

export function getWarehousesApiCall() {
    const promise = fetch(booksBaseUrl);
    return promise;
}

export function getWarehouseByIdApiCall(magId) {
    const url = `${booksBaseUrl}/${magId}`;
    const promise = fetch(url);
    return promise;
}