import React from 'react';
import { getWarehousesApiCall } from '../../apiCalls/warehouseApiCalls';
import { Link } from 'react-router-dom';
import WarehouseListTable from "../warehouse/WarehouseListTable";

class WarehouseList extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            warehouses: []
        }
    };

    componentDidMount() {
        this.fetchWarehouseList();
    };

    fetchWarehouseList = () => {
        getWarehousesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        warehouses: data
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
        const {error, isLoaded, warehouses} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych magazynów...</p>
        } else {
            content = <WarehouseListTable warehousesList={warehouses}/>
        }

        return (
            <main>
                <h2>Lista magaynów</h2>
                {content}
                <p><Link to="/warehouse/add" className="button-add">Dodaj nowy magazyn</Link></p>
            </main>
        )
    };

};

export default WarehouseList;