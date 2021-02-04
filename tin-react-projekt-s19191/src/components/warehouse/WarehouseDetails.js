import React from 'react';
import { Link } from 'react-router-dom';
import { getWarehouseByIdApiCall } from '../../apiCalls/warehouseApiCalls';
import WarehouseDetailsData from "../warehouse/WarehouseDetailsData";
import { withTranslation } from 'react-i18next';

class WarehouseDetails extends React.Component {
    constructor(props) {
        super(props);
        let {magId} = props.match.params;
        this.state = {
            magId: magId,
            warehouse: null,
            error: null,
            isLoaded: false,
            message: null
        };
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
                });
    };

    render() {
        const { t } = this.props;
        const { warehouse, error, isLoaded, message } = this.state;
        let content;

        if (error) {
            content = <p>{t('errors.error')} {error.message}</p>;
        } else if (!isLoaded) {
            content = <p>{t('mag.details.loading')}</p>;
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <WarehouseDetailsData warehouseData={warehouse} />;
        };
        return (
            <main>
                <h2>{t('mag.details.pageTitle')}</h2>
                {content}
                <div className="section-buttons">
                    <p><Link to="/warehouse" className="list-actions-button-details">{t('form.actions.return')}</Link></p>
                </div>
            </main>
        )
    };
};

export default withTranslation()(WarehouseDetails);