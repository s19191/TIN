import React from 'react';
import {useTranslation} from "react-i18next";
import DetailsInput from "../details/DetailsInput";
import {Link} from "react-router-dom";
import {isAuthenticated, isCreatorOrAdmin} from "../../helpers/authHelper";

function ConditionInWarehouseDetailsData(props) {
    const swm = props.conditionInWarehouseData;
    const { t } = useTranslation();

    let isAble;
    if (isAuthenticated()) {
        isAble = isCreatorOrAdmin(swm.User_Id_User);
    };
    let editButton;
    if(isAuthenticated() && isAble) {
        editButton = <p><Link to={`/conditionInWarehouse/edit/${swm.Id_StanWMagazynie}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></p>;
    };

    return (
        <React.Fragment>
            <form className="form">
                <DetailsInput
                    type="text"
                    label={t('swm.list.fields.Ksiazka')}
                    required
                    name="Ksiazka_Id_Ksiazka"
                    value={swm.ksiazka.Tytul}
                />
                <DetailsInput
                    type="text"
                    label={t('swm.list.fields.Magazyn')}
                    required
                    name="Magazyn_Id_Magazyn"
                    value={swm.magazyn.Nazwa}
                />
                <DetailsInput
                    type="number"
                    label={t('swm.list.fields.IloscNaStanie')}
                    required
                    name="IloscNaStanie"
                    value={swm.IloscNaStanie}
                />
                <DetailsInput
                    type="number"
                    label={t('swm.list.fields.CenaHurtowa')}
                    name="CenaHurtowa"
                    value={swm.CenaHurtowa ? swm.CenaHurtowa : 0}
                />
                <DetailsInput
                    type="number"
                    label={t('swm.list.fields.MinimalnaIloscDoCenyHurtowej')}
                    name="MinimalnaIloscDoCenyHurtowej"
                    value={swm.MinimalnaIloscDoCenyHurtowej ? swm.MinimalnaIloscDoCenyHurtowej : 0}
                />
                <DetailsInput
                    type="number"
                    label={t('swm.list.fields.CenaDetaliczna')}
                    required
                    name="CenaDetaliczna"
                    value={swm.CenaDetaliczna}
                />
            </form>
            {editButton}
            <p><Link to="/conditionInWarehouse" className="list-actions-button-details">{t('list.actions.details')}</Link></p>
        </React.Fragment>
    )
};

export default ConditionInWarehouseDetailsData;