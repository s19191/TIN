import React from 'react';

function WarehouseDetailsData(props) {
    const mag = props.warehouseData;
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
};

export default WarehouseDetailsData;