const booksBaseUrl = 'http://localhost:3000/api/stanWMagazynie';

export function getConditionsInWarehousesApiCall() {
    const promise = fetch(booksBaseUrl);
    return promise;
}

export function getConditionInWarehouseByIdApiCall(swmId) {
    const url = `${booksBaseUrl}/${swmId}`;
    const promise = fetch(url);
    return promise;
}

export function addBookApiCall(ks) {
    const ksString = JSON.stringify(ks)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ksString
    }
    const promise = fetch(booksBaseUrl, options);
    return promise;
}

export function updateBookApiCall(ksId, ks) {
    const url = `${booksBaseUrl}/${ksId}`
    const ksString = JSON.stringify(ks)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ksString
    }
    const promise = fetch(url, options);
    return promise;
}