import React from "react";
import { Link } from 'react-router-dom';
import { getConditionsInwarehousesApiCall } from '../../apiCalls/conditionInwarehouseApiCalls';

function ConditionInwarehouseList() {
    const conditionInwarehouseList = getConditionsInwarehousesApiCall();

    return (
        <main>
            <h2>Lista stanów książek w magazynach</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Książka</th>
                    <th>Magazyn</th>
                    <th>Ilość na stanie</th>
                    <th>Cena hurtowa</th>
                    <th>Minimalna ilość zamówienia potrzebna do naliczenia ceny hurowej</th>
                    <th>Cena detaliczna</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {conditionInwarehouseList.map(swm => (
                    <tr key={swm.Id_StanWMagazynie}>
                        <td>{swm.ksiazka.Tytul}</td>
                        <td>{swm.magazyn.Nazwa}</td>
                        <td>{swm.IloscNaStanie}</td>
                        <td>{swm.CenaHurtowa}</td>
                        <td>{swm.MinimalnaIloscDoCenyHurtowej}</td>
                        <td>{swm.CenaDetaliczna}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={`conditionInwarehouse/details/${swm.Id_StanWMagazynie}`} className="list-actions-button-details">Szczegóły</Link></li>
                                <li><Link to={`conditionInwarehouse/edit/${swm.Id_StanWMagazynie}`} className="list-actions-button-edit">Edytuj</Link></li>
                                <li><Link to={`conditionInwarehouse/delete/${swm.Id_StanWMagazynie}`} className="list-actions-button-delete">Usuń</Link></li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p className="section-buttons">
                <Link to="/conditionInwarehouse/add" className="button-add">Dodaj nowy stan książki w konkretnym magazynie</Link>
            </p>
        </main>
    )
}

export default ConditionInwarehouseList;