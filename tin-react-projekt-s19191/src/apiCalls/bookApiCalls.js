import { bookDetailsList } from './bookApiMockData';
const booksBaseUrl = 'http://localhost:3000/api/ksiazki';

export function getBooksApiCall() {
    const promise = fetch(booksBaseUrl)
    return promise;
}

export function getBookByIdApiCall(ksId) {
    const ks = bookDetailsList.find(ks => ks.Id_Ksiazka === ksId)
    return ks;
}