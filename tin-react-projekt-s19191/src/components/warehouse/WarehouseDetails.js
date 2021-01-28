import React from 'react';
import { Link } from 'react-router-dom';
import { getWarehouseByIdApiCall } from '../../apiCalls/warehouseApiCalls';
import WarehouseDetailsData from "../warehouse/WarehouseDetailsData";

class WarehouseDetails extends React.Component {
    constructor(props) {
        super(props)
        let {magId} = props.match.params
        this.state = {
            magId: magId,
            warehouse: null,
            error: null,
            isLoaded: false,
            message: null
        }
    };

    componentDidMount() {
        this.fetchWarehouseDetails();
    };

    fetchWarehouseDetails = () => {
        getWarehouseByIdApiCall(this.state.magId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            warehouse: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            warehouse: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    };

    render() {
        const { warehouse, error, isLoaded, message } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych magazynu...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <WarehouseDetailsData warehouseData={warehouse} />
        }
        return (
            <main>
                <h2>Szczegóły magazynu</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/warehouse" className="list-actions-button-details">Powrót</Link>
                </div>
            </main>
        )
    };
};

export default WarehouseDetails;

//     let { magId } = useParams();
//     magId = parseInt(magId);
//     const mag = getWarehouseByIdApiCall(magId);
//
//     return (
//         <main>
//             <h2>Szczegóły magazynu</h2>
//             <p>Nazwa: {mag.Nazwa}</p>
//             <p>Adres: {mag.Adres} </p>
//             <h2>Szczegóły książek znajdujących się w magazynie</h2>
//             <table className="table-list">
//                 <thead>
//                 <tr>
//                     <th>Tytuł książki</th>
//                     <th>Ilość na stanie</th>
//                     <th>Cena hurtowa</th>
//                     <th>Minimalna ilość zamówienia potrzebna do naliczenia ceny hurowej</th>
//                     <th>Cena detaliczna</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {mag.stanyWMagazynach.map(
//                     swm =>
//                         <tr key={swm.Id_StanWMagazynie}>
//                             <td>{swm.ksiazka.Tytul}</td>
//                             <td>{swm.IloscNaStanie}</td>
//                             <td>{swm.CenaHurtowa ? swm.CenaHurtowa : 0}</td>
//                             <td>{swm.MinimalnaIloscDoCenyHurtowej ? swm.MinimalnaIloscDoCenyHurtowej : 0}</td>
//                             <td>{swm.CenaDetaliczna}</td>
//                         </tr>
//                 )}
//                 </tbody>
//             </table>
//             <div className="section-buttons">
//                 <Link to="/warehouse" className="list-actions-button-details">Powrót</Link>
//             </div>
//         </main>
//     )
// }