import React from 'react';
import {useTranslation} from "react-i18next";

function WarehouseDetailsData(props) {
    const mag = props.warehouseData;
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('mag.details.form.fields.Nazwa')} {mag.Nazwa}</p>
            <p>{t('mag.details.form.fields.Adres')} {mag.Adres} </p>
            <h2>{t('mag.details.subtitle')}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('mag.details.table.Ksiazka')}</th>
                    <th>{t('mag.details.table.IloscNaStanie')}</th>
                    <th>{t('mag.details.table.CenaHurtowa')}</th>
                    <th>{t('mag.details.table.MinimalnaIloscDoCenyHurtowej')}</th>
                    <th>{t('mag.details.table.CenaDetaliczna')}</th>
                </tr>
                </thead>
                <tbody>
                {mag.stanyWMagazynach.map(
                    swm =>
                        <tr key={swm.Id_StanWMagazynie}>
                            <td>{swm.ksiazka.Tytul}</td>
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

export default WarehouseDetailsData;