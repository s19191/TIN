import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { isAuthenticated, isCreatorOrAdmin } from "../../helpers/authHelper";
import { deleteWarehouseApiCall } from "../../apiCalls/warehouseApiCalls";

function BookListTableRow(props) {
    const mag = props.warehouseData;
    const { t } = useTranslation();

    let isAble;
    if (isAuthenticated()) {
        isAble = isCreatorOrAdmin(mag.User_Id_User);
    };

    let editButton,
        deleteButton;
    if(isAuthenticated() && isAble) {
        editButton = <li><Link to={`/warehouse/edit/${mag.Id_Magazyn}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>;
        deleteButton = <li><Link to={`/warehouse`} onClick={() => {
            deleteWarehouseApiCall(mag.Id_Magazyn)
                .then(() =>
                    window.location.reload(false));
        }} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>;
    };

    return (
        <tr key={mag.Id_Magazyn}>
            <td>{mag.Nazwa}</td>
            <td>{mag.Adres}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/warehouse/details/${mag.Id_Magazyn}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    {editButton}
                    {deleteButton}
                </ul>
            </td>
        </tr>
    )
};

export default BookListTableRow;