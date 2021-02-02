import React from 'react';
import { Link } from 'react-router-dom';
import { getFormattedDate } from '../../helpers/dateHelper';
import { useTranslation } from "react-i18next";
import { isAuthenticated } from "../../helpers/authHelper";
import { deleteBookApiCall } from "../../apiCalls/bookApiCalls";

function BookListTableRow(props) {
    const ks = props.bookData;
    const { t } = useTranslation();
    return (
        <tr key={ks.Id_Ksiazka}>
            <td>{ks.Tytul}</td>
            <td>{ks.Autor}</td>
            <td>{ks.DataWydania ? getFormattedDate(ks.DataWydania) : ""}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`book/details/${ks.Id_Ksiazka}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    {isAuthenticated() &&
                    <li><Link to={`book/edit/${ks.Id_Ksiazka}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    }
                    {isAuthenticated() &&
                    <li><Link to={`/book`} onClick={() => {
                        deleteBookApiCall(ks.Id_Ksiazka)
                            .then(() =>
                                window.location.reload(false));
                    }} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                    }
                </ul>
            </td>
        </tr>
    )
};

export default BookListTableRow;