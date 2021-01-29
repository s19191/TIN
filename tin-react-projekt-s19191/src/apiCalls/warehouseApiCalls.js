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

export function addWarehouseApiCall(mag) {
    const magString = JSON.stringify(mag)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: magString
    }
    const promise = fetch(booksBaseUrl, options);
    return promise;
}

export function updateWarehouseApiCall(magId, mag) {
    const url = `${booksBaseUrl}/${magId}`
    const magString = JSON.stringify(mag)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: magString
    }
    const promise = fetch(url, options);
    return promise;
}