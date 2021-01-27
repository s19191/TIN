import React from "react";
import { Link } from 'react-router-dom';
import { getConditionsInwarehousesApiCall } from '../../apiCalls/conditionInwarehouseApiCalls';
import ConditionInwarehouseListTable from ".//ConditionInWarehouseListTable";

class ConditionInWarehouseList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            conditionsInwarehouses: []
        }
    };

    componentDidMount() {
        this.fetchConditionInwarehouseList();
    };

    fetchConditionInwarehouseList = () => {
        getConditionsInwarehousesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        conditionsInwarehouses: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };

    render() {
        const {error, isLoaded, conditionsInwarehouses} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych stanów książek w magazynach...</p>
        } else {
            content = <ConditionInwarehouseListTable conditionsInwarehousesList={conditionsInwarehouses}/>
        }

        return (
            <main>
                <h2>Lista stanów książek w magazynach</h2>
                {content}
                <p><Link to="/conditionInWarehouse/add" className="button-add">Dodaj nową książkę</Link></p>
            </main>
        )
    };
}

export default ConditionInWarehouseList;

//     return (
//         <main>
//             <h2>Lista stanów książek w magazynach</h2>
//             <table className="table-list">
//                 <thead>
//                 <tr>
//                     <th>Książka</th>
//                     <th>Magazyn</th>
//                     <th>Ilość na stanie</th>
//                     <th>Cena hurtowa</th>
//                     <th>Minimalna ilość zamówienia potrzebna do naliczenia ceny hurowej</th>
//                     <th>Cena detaliczna</th>
//                     <th>Akcje</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {conditionInwarehouseList.map(swm => (
//                     <tr key={swm.Id_StanWMagazynie}>
//                         <td>{swm.ksiazka.Tytul}</td>
//                         <td>{swm.magazyn.Nazwa}</td>
//                         <td>{swm.IloscNaStanie}</td>
//                         <td>{swm.CenaHurtowa}</td>
//                         <td>{swm.MinimalnaIloscDoCenyHurtowej}</td>
//                         <td>{swm.CenaDetaliczna}</td>
//                         <td>
//                             <ul className="list-actions">
//                                 <li><Link to={`conditionInWarehouse/details/${swm.Id_StanWMagazynie}`} className="list-actions-button-details">Szczegóły</Link></li>
//                                 <li><Link to={`conditionInWarehouse/edit/${swm.Id_StanWMagazynie}`} className="list-actions-button-edit">Edytuj</Link></li>
//                                 <li><Link to={`conditionInWarehouse/delete/${swm.Id_StanWMagazynie}`} className="list-actions-button-delete">Usuń</Link></li>
//                             </ul>
//                         </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//             <p className="section-buttons">
//                 <Link to="/conditionInWarehouse/add" className="button-add">Dodaj nowy stan książki w konkretnym magazynie</Link>
//             </p>
//         </main>
//     )
// }