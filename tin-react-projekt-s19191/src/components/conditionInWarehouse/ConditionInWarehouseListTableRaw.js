import React from 'react';
import { Link } from 'react-router-dom';

function ConditionInWarehouseListTableRaw(props) {
    const swm = props.conditionInwarehouseData;
    return (
        <tr key={swm.Id_StanWMagazynie}>
            <td>{swm.ksiazka.Tytul}</td>
            <td>{swm.magazyn.Nazwa}</td>
            <td>{swm.IloscNaStanie}</td>
            <td>{swm.CenaHurtowa ? swm.CenaHurtowa : 0}</td>
            <td>{swm.MinimalnaIloscDoCenyHurtowej ? swm.MinimalnaIloscDoCenyHurtowej : 0}</td>
            <td>{swm.CenaDetaliczna}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`conditionInWarehouse/details/${swm.Id_StanWMagazynie}`} className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`conditionInWarehouse/edit/${swm.Id_StanWMagazynie}`} className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`conditionInWarehouse/delete/${swm.Id_StanWMagazynie}`} className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
};

export default ConditionInWarehouseListTableRaw;