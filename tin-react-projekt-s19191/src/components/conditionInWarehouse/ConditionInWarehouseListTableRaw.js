import React from 'react';
import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function ConditionInWarehouseListTableRaw(props) {
    const swm = props.conditionInwarehouseData;
    const { t } = useTranslation();
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
                    <li><Link to={`conditionInWarehouse/details/${swm.Id_StanWMagazynie}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    {isAuthenticated() &&
                    <li><Link to={`conditionInWarehouse/edit/${swm.Id_StanWMagazynie}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    }
                    {isAuthenticated() &&
                    <li><Link to={`conditionInWarehouse/delete/${swm.Id_StanWMagazynie}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                    }
                </ul>
            </td>
        </tr>
    )
};

export default ConditionInWarehouseListTableRaw;