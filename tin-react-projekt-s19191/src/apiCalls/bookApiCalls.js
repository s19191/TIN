const booksBaseUrl = 'http://localhost:3000/api/ksiazki';

export function getBooksApiCall() {
    const promise = fetch(booksBaseUrl);
    return promise;
};

export function getBookByIdApiCall(ksId) {
    const url = `${booksBaseUrl}/${ksId}`;
    const promise = fetch(url);
    return promise;
};

export function addBookApiCall(ks) {
    const ksString = JSON.stringify(ks);
    console.log(ksString);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ksString
    }
    const promise = fetch(booksBaseUrl, options);
    return promise;
};

export function updateBookApiCall(ksId, ks) {
    const url = `${booksBaseUrl}/${ksId}`;
    const ksString = JSON.stringify(ks);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ksString
    }
    const promise = fetch(url, options);
    return promise;
};

export function deleteBookApiCall(ksId) {
    const url = `${booksBaseUrl}/${ksId}`;
    const options = {
        method: 'DELETE'
    }
    const promise = fetch(url, options);
    return promise;
};