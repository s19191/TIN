import { bookDetailsList } from './bookApiMockData';
const booksBaseUrl = 'http://localhost:3000/api/ksiazki';

export function getBooksApiCall() {
    const promise = fetch(booksBaseUrl);
    return promise;
}

export function getBookByIdApiCall(ksId) {
    const url = `${booksBaseUrl}/${ksId}`;
    const promise = fetch(url);
    return promise;
}