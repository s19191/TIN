import React from 'react';
import BookListTableRow from './BookListTableRow';

function BookListTable(props) {
    const books = props.booksList;
    return (
        <table className="table-list" >
            <thead>
            <tr>
                <th>Tytul</th>
                <th>Autor</th>
                <th>Data wydania</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {books.map(ks =>
                <BookListTableRow bookData={ks} key={ks.Id_Ksiazka} />
            )}
            </tbody>
        </table >
    )
};

export default BookListTable