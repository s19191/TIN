import React from 'react';
import { getFormattedDate } from '../../helpers/dateHelper';

function ConditionInWarehouseDetailsData(props) {
    const swm = props.conditionInWarehouseData
    return (
        <React.Fragment>
            <p>Ksiazka: {swm.ksiazka.Tytul}</p>
            <p>Magazyn: {swm.magazyn.Nazwa} </p>
            <p>Ilość na stanie: {swm.IloscNaStanie} </p>
            <p>Cena hurtowa: {swm.CenaHurtowa ? swm.CenaHurtowa : 0} </p>
            <p>Minimalna ilość zamówienia potrzebna do naliczenia ceny hurowej: {swm.MinimalnaIloscDoCenyHurtowej ? swm.MinimalnaIloscDoCenyHurtowej : 0} </p>
            <p>Cena detaliczna: {swm.CenaDetaliczna} </p>
        </React.Fragment>
    )
}

export default ConditionInWarehouseDetailsData