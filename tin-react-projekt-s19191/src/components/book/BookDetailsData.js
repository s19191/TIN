import React from 'react';
import { getFormattedDate } from '../../helpers/dateHelper';
import { useTranslation } from 'react-i18next';

function BookDetailsData(props) {
    const ks = props.bookData;
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('ks.details.form.fields.Tytul')} {ks.Tytul}</p>
            <p>{t('ks.details.form.fields.Autor')} {ks.Autor} </p>
            <p>{t('ks.details.form.fields.DataWydania')} {ks.DataWydania ? getFormattedDate(ks.DataWydania) : ""} </p>
            <h2>{t('ks.details.subtitle')}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('ks.details.table.Magazyn')}</th>
                    <th>{t('ks.details.table.IloscNaStanie')}</th>
                    <th>{t('ks.details.table.CenaHurtowa')}</th>
                    <th>{t('ks.details.table.MinimalnaIloscDoCenyHurtowej')}</th>
                    <th>{t('ks.details.table.CenaDetaliczna')}</th>
                </tr>
                </thead>
                <tbody>
                {ks.stanyWMagazynach.map(
                    swm =>
                        <tr key={swm.Id_StanWMagazynie}>
                            <td>{swm.magazyn.Nazwa}</td>
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