import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { getConditionInwarehouseByIdApiCall } from '../../apiCalls/conditionInwarehouseApiCalls';

function ConditionInwarehouseDetails() {
    let { swmId } = useParams();
    swmId = parseInt(swmId);
    const swm = getConditionInwarehouseByIdApiCall(swmId);

    return (
        <main>
            <h2>Szczegóły stanu książki w konretnym magazynie</h2>
            <p>Ksiazka: {swm.ksiazka.Tytul}</p>
            <p>Magazyn: {swm.magazyn.Nazwa} </p>
            <p>Ilość na stanie: {swm.IloscNaStanie} </p>
            <p>Cena hurtowa: {swm.CenaHurtowa ? swm.CenaHurtowa : 0} </p>
            <p>Minimalna ilość zamówienia potrzebna do naliczenia ceny hurowej: {swm.MinimalnaIloscDoCenyHurtowej ? swm.MinimalnaIloscDoCenyHurtowej : 0} </p>
            <p>Cena detaliczna: {swm.CenaDetaliczna} </p>
            <div className="section-buttons">
                <Link to="/conditionInwarehouse" className="button-back">Powrót</Link>
            </div>
        </main>
    )
}

export default ConditionInwarehouseDetails
