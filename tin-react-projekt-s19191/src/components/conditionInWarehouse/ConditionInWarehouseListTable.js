import React from 'react';
import ConditionInWarehouseListTableRaw from './ConditionInWarehouseListTableRaw';

function ConditionInWarehouseListTable(props) {
    const conditionsInwarehouses = props.conditionsInwarehousesList;
    return (
        <table className="table-list" >
            <thead>
            <tr>
                <th>Książka</th>
                <th>Magazyn</th>
                <th>Ilość na stanie</th>
                <th>Cena hurtowa</th>
                <th>Minimalna ilość zamówienia potrzebna do naliczenia ceny hurowej</th>
                <th>Cena detaliczna</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {conditionsInwarehouses.map(swm =>
                <ConditionInWarehouseListTableRaw conditionInwarehouseData={swm} key={swm.Id_StanWMagazynie} />
            )}
            </tbody>
        </table >
    )
};

export default ConditionInWarehouseListTable