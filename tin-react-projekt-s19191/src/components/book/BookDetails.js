import React from 'react';
import { Link } from 'react-router-dom';
import { getBookByIdApiCall } from '../../apiCalls/bookApiCalls';
import BookDetailsData from "./BookDetailsData";
import { withTranslation } from 'react-i18next';

class BookDetails extends React.Component {
    constructor(props) {
        super(props);
        let { ksId } = props.match.params;
        this.state = {
            ksId: ksId,
            book: null,
            error: null,
            isLoaded: false,
            message: null
        };
    };

    componentDidMount() {
        this.fetchBookDetails();
    };

    fetchBookDetails = () => {
        getBookByIdApiCall(this.state.ksId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            book: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            book: data,
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
        const { book, error, isLoaded, message } = this.state;
        let content;

        if (error) {
            content = <p>{t('errors.error')} {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('ks.details.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <BookDetailsData bookData={book} />
        };
        return (
            <main>
                <h2>{t('ks.details.pageTitle')}</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/book" className="list-actions-button-details">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    };
};

export default withTranslation()(BookDetails);