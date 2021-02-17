import React from "react";
import { Link } from 'react-router-dom';
import { getConditionsInWarehousesApiCall } from '../../apiCalls/conditionInWarehouseApiCalls';
import ConditionInwarehouseListTable from ".//ConditionInWarehouseListTable";
import { withTranslation } from 'react-i18next';
import { isAuthenticated } from "../../helpers/authHelper";

class ConditionInWarehouseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            conditionsInWarehouses: []
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
                        conditionsInWarehouses: data
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
        const {error, isLoaded, conditionsInWarehouses} = this.state;
        let content;
        const { t } = this.props;

        if (error) {
            content = <p>{t('errors.error')} {error.message}</p>;
        } else if (!isLoaded) {
            content = <p>{t('swm.list.loading')}</p>;
        } else {
            content = <ConditionInwarehouseListTable conditionsInWarehousesList={conditionsInWarehouses}/>;
        };

        return (
            <main>
                <h2>{t('swm.list.pageTitle')}</h2>
                {content}
                {(isAuthenticated() && isLoaded) &&
                <p><Link to="/conditionInWarehouse/add" className="button-add">{t('swm.list.addNew')}</Link></p>
                }
            </main>
        )
    };
};

export default withTranslation()(ConditionInWarehouseList);