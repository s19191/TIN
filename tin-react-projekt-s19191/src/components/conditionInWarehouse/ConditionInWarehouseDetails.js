import React from 'react';
import { Link } from 'react-router-dom';
import { getConditionInWarehouseByIdApiCall } from '../../apiCalls/conditionInWarehouseApiCalls';
import ConditionInWarehouseDetailsData from "../conditionInWarehouse/ConditionInWarehouseDetailsData";
import { withTranslation } from 'react-i18next';

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
        getConditionInWarehouseByIdApiCall(this.state.swmId)
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
        const { t } = this.props;

        if (error) {
            content = <p>{t('errors.error')} {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('swm.details.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <ConditionInWarehouseDetailsData conditionInWarehouseData={conditionInWarehouse} />
        }
        return (
            <main>
                <h2>{t('swm.details.pageTitle')}</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/conditionInWarehouse" className="list-actions-button-details">{t('list.actions.details')}</Link>
                </div>
            </main>
        )
    };
};

export default withTranslation()(ConditionInWarehouseDetails);