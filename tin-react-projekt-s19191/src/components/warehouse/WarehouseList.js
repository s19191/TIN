import React from 'react';
import { getWarehousesApiCall } from '../../apiCalls/warehouseApiCalls';
import { Link } from 'react-router-dom';

function WarehouseList() {
    const warehouseList = getWarehousesApiCall();
    return (
        <main>
            <h2>Lista magazynów</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Adres</th>
                    <th className="list-actions">Akcje</th>
                </tr>
                </thead>
                <tbody>
                {warehouseList.map(mag => (
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
                ))}
                </tbody>
            </table>
            <p><Link to="/warehouse/add" className="button-add">Dodaj nowy magazyn</Link></p>
        </main>
    )
}

export default WarehouseList;