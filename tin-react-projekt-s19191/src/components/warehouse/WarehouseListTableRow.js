import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function BookListTableRow(props) {
    const mag = props.warehouseData;
    const { t } = useTranslation();
    return (
        <tr key={mag.Id_Magazyn}>
            <td>{mag.Nazwa}</td>
            <td>{mag.Adres}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`warehouse/details/${mag.Id_Magazyn}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    {isAuthenticated() &&
                    <li><Link to={`warehouse/edit/${mag.Id_Magazyn}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    }
                    {isAuthenticated() &&
                    <li><Link to={`warehouse/delete/${mag.Id_Magazyn}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                    }
                </ul>
            </td>
        </tr>
    )
};

export default BookListTableRow;