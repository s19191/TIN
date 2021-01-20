import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBookByIdApiCall } from '../../apiCalls/bookApiCalls';
import { getFormattedDate } from '../../helpers/dateHelper';

function BookDetails() {
    let { ksId } = useParams()
    ksId = parseInt(ksId)
    const ks = getBookByIdApiCall(ksId)

    return (
        <main>
            <h2>Szczegóły książki</h2>
            <p>Tytuł: {ks.Tytul}</p>
            <p>Autor: {ks.Autor} </p>
            <p>Data wydania: {ks.DataWydania ? getFormattedDate(ks.DataWydania) : ""} </p>
            <h2>Szczegóły stanów książki w magazynach</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Nazwa magazynu</th>
                    <th>Ilość na stanie</th>
                    <th>Cena hurtowa</th>
                    <th>Minimalna ilość zamówienia potrzebna do naliczenia ceny hurowej</th>
                    <th>Cena detaliczna</th>
                </tr>
                </thead>
                <tbody>
                {ks.stanyWMagazynach.map(
                    swm =>
                        <tr key={swm.Id_StanWMagazynie}>
                            <td>{swm.magazyn.Nazwa}</td>
                            <td>{swm.IloscNaStanie}</td>
                            <td>{swm.CenaHurtowa ? swm.CenaHurtowa : 0}</td>
                            <td>{swm.MinimalnaIloscDoCenyHurtowej ? swm.MinimalnaIloscDoCenyHurtowej : 0}</td>
                            <td>{swm.CenaDetaliczna}</td>
                        </tr>
                )}
                </tbody>
            </table>
            <div className="section-buttons">
                <Link to="/books" className="list-actions-button-details">Powrót</Link>
            </div>
        </main>
    )
}
export default BookDetails