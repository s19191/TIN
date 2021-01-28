import React from 'react';
import { Link } from 'react-router-dom';
import { getConditionInwarehouseByIdApiCall } from '../../apiCalls/conditionInwarehouseApiCalls';
import ConditionInWarehouseDetailsData from "../conditionInWarehouse/ConditionInWarehouseDetailsData";

class ConditionInWarehouseDetails extends React.Component {
    constructor(props) {
        super(props)
        let {swmId} = props.match.params
        this.state = {
            swmId: swmId,
            conditionInWarehouse: null,
            error: null,
            isLoaded: false,
            message: null
        }
    };

    componentDidMount() {
        this.fetchConditionInWarehouseDetails();
    };

    fetchConditionInWarehouseDetails = () => {
        getConditionInwarehouseByIdApiCall(this.state.swmId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            conditionInWarehouse: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            conditionInWarehouse: data,
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
        const { conditionInWarehouse, error, isLoaded, message } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych stanu książki w magazynie...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <ConditionInWarehouseDetailsData conditionInWarehouseData={conditionInWarehouse} />
        }
        return (
            <main>
                <h2>Szczegóły stanu książki w konretnym magazynie</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/conditionInWarehouse" className="list-actions-button-details">Powrót</Link>
                </div>
            </main>
        )
    };
};

export default ConditionInWarehouseDetails;