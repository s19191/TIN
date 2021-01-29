import React from "react";
import { Link } from 'react-router-dom';
import { getConditionsInWarehousesApiCall } from '../../apiCalls/conditionInWarehouseApiCalls';
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
        getConditionsInWarehousesApiCall()
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