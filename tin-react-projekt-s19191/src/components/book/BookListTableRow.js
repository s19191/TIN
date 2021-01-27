import React from 'react';
import { Link } from 'react-router-dom';
import { getFormattedDate } from '../../helpers/dateHelper';

function BookListTableRow(props) {
    const ks = props.bookData;
    return (
        <tr>
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
    )
};

export default BookListTableRow