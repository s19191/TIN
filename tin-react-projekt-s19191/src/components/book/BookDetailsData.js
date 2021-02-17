import React from 'react';
import { getFormattedDate } from '../../helpers/dateHelper';
import { useTranslation } from 'react-i18next';
import DetailsInput from "../details/DetailsInput";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../helpers/authHelper";

function BookDetailsData(props) {
    const ks = props.bookData;
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <form className="form">
                <DetailsInput
                    type="text"
                    label={t('ks.list.fields.Tytul')}
                    required
                    name="Tytul"
                    value={ks.Tytul}
                />
                <DetailsInput
                    type="text"
                    label={t('ks.list.fields.Autor')}
                    required
                    name="Autor"
                    value={ks.Autor}
                />
                <DetailsInput
                    type="date"
                    label={t('ks.list.fields.DataWydania')}
                    required
                    name="DataWydania"
                    value={ks.DataWydania ? getFormattedDate(ks.DataWydania) : ""}
                />
            </form>
            {isAuthenticated() &&
            <p><Link to={`/book/edit/${ks.Id_Ksiazka}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></p>
            }
            <h2>{t('ks.details.subtitle')}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('ks.details.fields.Magazyn')}</th>
                    <th>{t('ks.details.fields.IloscNaStanie')}</th>
                    <th>{t('ks.details.fields.CenaHurtowa')}</th>
                    <th>{t('ks.details.fields.MinimalnaIloscDoCenyHurtowej')}</th>
                    <th>{t('ks.details.fields.CenaDetaliczna')}</th>
                </tr>
                </thead>
                <tbody>
                {ks.stanyWMagazynach.map(
                    swm =>
                        <tr key={swm.Id_StanWMagazynie}>
                            <td><Link to={`/warehouse/details/${swm.magazyn.Id_Magazyn}`}>{swm.magazyn.Nazwa}</Link></td>
                            <td>{swm.IloscNaStanie}</td>
                            <td>{swm.CenaHurtowa ? swm.CenaHurtowa : 0}</td>
                            <td>{swm.MinimalnaIloscDoCenyHurtowej ? swm.MinimalnaIloscDoCenyHurtowej : 0}</td>
                            <td>{swm.CenaDetaliczna}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </React.Fragment>
    )
};

export default BookDetailsData;