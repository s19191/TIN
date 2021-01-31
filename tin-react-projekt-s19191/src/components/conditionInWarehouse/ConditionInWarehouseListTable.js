import React from 'react';
import ConditionInWarehouseListTableRaw from './ConditionInWarehouseListTableRaw';
import {useTranslation} from "react-i18next";

function ConditionInWarehouseListTable(props) {
    const conditionsInWarehouses = props.conditionsInWarehousesList;
    const { t } = useTranslation();
    return (
        <table className="table-list" >
            <thead>
            <tr>
                <th>{t('swm.list.fields.Ksiazka')}</th>
                <th>{t('swm.list.fields.Magazyn')}</th>
                <th>{t('swm.list.fields.IloscNaStanie')}</th>
                <th>{t('swm.list.fields.CenaHurtowa')}</th>
                <th>{t('swm.list.fields.MinimalnaIloscDoCenyHurtowej')}</th>
                <th>{t('swm.list.fields.CenaDetaliczna')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {conditionsInWarehouses.map(swm =>
                <ConditionInWarehouseListTableRaw conditionInwarehouseData={swm} key={swm.Id_StanWMagazynie} />
            )}
            </tbody>
        </table >
    )
};

export default ConditionInWarehouseListTable;