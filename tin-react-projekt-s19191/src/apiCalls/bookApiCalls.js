import { bookList, bookDetailsList } from './bookApiMockData';

export function getBooksApiCall() {
    return bookList;
}

export function getBookByIdApiCall(ksId) {
    const ks = bookDetailsList.find(ks => ks.Id_Ksiazka === ksId)
    return ks;
}