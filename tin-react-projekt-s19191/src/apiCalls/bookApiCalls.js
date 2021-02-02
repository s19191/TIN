import { getCurrentUser } from "../helpers/authHelper";

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
    const user = getCurrentUser();
    let token;
    if (user && user.token) {
        token = user.token;
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: ksString
    };
    const promise = fetch(booksBaseUrl, options);
    return promise;
};

export function updateBookApiCall(ksId, ks) {
    const url = `${booksBaseUrl}/${ksId}`;
    const ksString = JSON.stringify(ks);
    const user = getCurrentUser();
    let token;
    if (user && user.token) {
        token = user.token;
    };
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: ksString
    };
    const promise = fetch(url, options);
    return promise;
};

export function deleteBookApiCall(ksId) {
    const url = `${booksBaseUrl}/${ksId}`;
    const user = getCurrentUser();
    let token;
    if (user && user.token) {
        token = user.token;
    };
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    };
    const promise = fetch(url, options);
    return promise;
};