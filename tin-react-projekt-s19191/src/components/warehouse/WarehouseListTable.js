import React from 'react';
import WarehouseListTableRow from './WarehouseListTableRow';

function WarehouseListTable(props) {
    const warehouses = props.warehousesList;
    return (
        <table className="table-list" >
            <thead>
            <tr>
                <th>Nazwa</th>
                <th>Autor</th>
                <th className="list-actions">Akcje</th>
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

export default WarehouseListTable