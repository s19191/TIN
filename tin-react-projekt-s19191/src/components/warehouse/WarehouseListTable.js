import React from 'react';
import WarehouseListTableRow from './WarehouseListTableRow';
import { useTranslation } from 'react-i18next';

function WarehouseListTable(props) {
    const warehouses = props.warehousesList;
    const { t } = useTranslation();
    return (
        <table className="table-list" >
            <thead>
            <tr>
                <th>{t('mag.list.fields.Nazwa')}</th>
                <th>{t('mag.list.fields.Adres')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {warehouses.map(mag =>
                <WarehouseListTableRow warehouseData={mag} key={mag.Id_Magazyn} />
            )}
            </tbody>
        </table >
    )
};

export default WarehouseListTable;