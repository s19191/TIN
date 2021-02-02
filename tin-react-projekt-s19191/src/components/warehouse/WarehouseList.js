import React from 'react';
import { getWarehousesApiCall } from '../../apiCalls/warehouseApiCalls';
import { Link } from 'react-router-dom';
import WarehouseListTable from "../warehouse/WarehouseListTable";
import { withTranslation } from 'react-i18next';
import { isAuthenticated } from "../../helpers/authHelper";

class WarehouseList extends React.Component {
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
        const {error, isLoaded, warehouses} = this.state;
        let content;
        const { t } = this.props;

        if (error) {
            content = <p>{t('errors.error')} {error.message}</p>;
        } else if (!isLoaded) {
            content = <p>{t('mag.list.loading')}</p>;
        } else {
            content = <WarehouseListTable warehousesList={warehouses}/>;
        };

        return (
            <main>
                <h2>{t('mag.list.pageTitle')}</h2>
                {content}
                {isAuthenticated() &&
                <p><Link to="/warehouse/add" className="button-add">{t('mag.list.addNew')}</Link></p>
                }
            </main>
        )
    };
};

export default withTranslation()(WarehouseList);