import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getWarehouseByIdApiCall } from '../../apiCalls/warehouseApiCalls';

function WarehouseDetails() {
    let { magId } = useParams();
    magId = parseInt(magId);
    const mag = getWarehouseByIdApiCall(magId);

    return (
        <main>
            <h2>Szczegóły magazynu</h2>
            <p>Nazwa: {mag.Nazwa}</p>
            <p>Adres: {mag.Adres} </p>
            <h2>Szczegóły książek znajdujących się w magazynie</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Tytuł książki</th>
                    <th>Ilość na stanie</th>
                    <th>Cena hurtowa</th>
                    <th>Minimalna ilość zamówienia potrzebna do naliczenia ceny hurowej</th>
                    <th>Cena detaliczna</th>
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
            <div className="section-buttons">
                <Link to="/warehouse" className="list-actions-button-details">Powrót</Link>
            </div>
        </main>
    )
}
export default WarehouseDetails;