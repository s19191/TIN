import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { isAuthenticated, isCreatorOrAdmin } from "../../helpers/authHelper";
import { deleteConditionInWarehouseApiCall } from "../../apiCalls/conditionInWarehouseApiCalls";

function ConditionInWarehouseListTableRaw(props) {
    const swm = props.conditionInwarehouseData;
    const { t } = useTranslation();

    let isAble;
    if (isAuthenticated()) {
        isAble = isCreatorOrAdmin(swm.User_Id_User);
    };
    let editButton,
        deleteButton;
    if(isAuthenticated() && isAble) {
        editButton = <li><Link to={`/conditionInWarehouse/edit/${swm.Id_StanWMagazynie}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>;
        deleteButton = <li><Link to={`/conditionInWarehouse`} onClick={() => {
            deleteConditionInWarehouseApiCall(swm.Id_StanWMagazynie)
                .then(() =>
                    window.location.reload(false));
        }} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>;
    };

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
                    <li><Link to={`/conditionInWarehouse/details/${swm.Id_StanWMagazynie}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    {editButton}
                    {deleteButton}
                </ul>
            </td>
        </tr>
    )
};

export default ConditionInWarehouseListTableRaw;