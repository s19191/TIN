import React from 'react';
import {useTranslation} from "react-i18next";

function ConditionInWarehouseDetailsData(props) {
    const swm = props.conditionInWarehouseData;
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('swm.details.form.fields.Ksiazka.label')} {swm.ksiazka.Tytul}</p>
            <p>{t('swm.details.form.fields.Magazyn.label')} {swm.magazyn.Nazwa} </p>
            <p>{t('swm.details.form.fields.IloscNaStanie')} {swm.IloscNaStanie} </p>
            <p>{t('swm.details.form.fields.CenaHurtowa')} {swm.CenaHurtowa ? swm.CenaHurtowa : 0} </p>
            <p>{t('swm.details.form.fields.MinimalnaIloscDoCenyHurtowej')} {swm.MinimalnaIloscDoCenyHurtowej ? swm.MinimalnaIloscDoCenyHurtowej : 0} </p>
            <p>{t('swm.details.form.fields.CenaDetaliczna')} {swm.CenaDetaliczna} </p>
        </React.Fragment>
    )
}

export default ConditionInWarehouseDetailsData