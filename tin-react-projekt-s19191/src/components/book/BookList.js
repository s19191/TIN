import React from 'react';
import { getBooksApiCall } from '../../apiCalls/bookApiCalls';
import { Link } from 'react-router-dom';
import { getFormattedDate } from '../../helpers/dateHelper';

function BookList() {
    const bookList = getBooksApiCall()
    return (
        <main>
            <h2>Lista książek</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Tytuł</th>
                    <th>Autor</th>
                    <th>Data wydania</th>
                    <th className="list-actions">Akcje</th>
                </tr>
                </thead>
                <tbody>
                {bookList.map(ks => (
                    <tr key={ks.Id_Ksiazka}>
                        <td>{ks.Tytul}</td>
                        <td>{ks.Autor}</td>
                        <td>{ks.DataWydania ? getFormattedDate(ks.DataWydania) : ""}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={`books/details/${ks.Id_Ksiazka}`} className="list-actions-button-details">Szczegóły</Link></li>
                                <li><Link to={`books/edit/${ks.Id_Ksiazka}`} className="list-actions-button-edit">Edytuj</Link></li>
                                <li><Link to={`books/delete/${ks.Id_Ksiazka}`} className="list-actions-button-delete">Usuń</Link></li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p><Link to="/books/add" className="button-add">Dodaj nową książkę</Link></p>
        </main>
    )
}

export default BookList