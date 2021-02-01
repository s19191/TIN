import React from 'react';
import {useTranslation} from "react-i18next";
import DetailsInput from "../form/DetailsInput";
import {Link} from "react-router-dom";

function WarehouseDetailsData(props) {
    const mag = props.warehouseData;
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <form className="form">
                <DetailsInput
                    type="text"
                    label={t('mag.list.fields.Nazwa')}
                    required
                    name="Nazwa"
                    value={mag.Nazwa}
                />
                <DetailsInput
                    type="text"
                    label={t('mag.list.fields.Adres')}
                    required
                    name="Adres"
                    value={mag.Adres}
                />
            </form>
            <p><Link to={`/warehouse/edit/${mag.Id_Magazyn}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></p>
            <h2>{t('mag.details.subtitle')}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('mag.details.fields.Ksiazka')}</th>
                    <th>{t('mag.details.fields.IloscNaStanie')}</th>
                    <th>{t('mag.details.fields.CenaHurtowa')}</th>
                    <th>{t('mag.details.fields.MinimalnaIloscDoCenyHurtowej')}</th>
                    <th>{t('mag.details.fields.CenaDetaliczna')}</th>
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