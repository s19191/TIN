import React from 'react';
import { Link } from 'react-router-dom';

function BookListTableRow(props) {
    const mag = props.warehouseData;
    return (
        <tr key={mag.Id_Magazyn}>
            <td>{mag.Nazwa}</td>
            <td>{mag.Adres}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`warehouse/details/${mag.Id_Magazyn}`} className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`warehouse/edit/${mag.Id_Magazyn}`} className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`warehouse/delete/${mag.Id_Magazyn}`} className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
};

export default BookListTableRow;