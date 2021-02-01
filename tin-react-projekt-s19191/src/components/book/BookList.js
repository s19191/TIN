import React from 'react';
import { getBooksApiCall } from '../../apiCalls/bookApiCalls';
import { Link } from 'react-router-dom';
import BookListTable from "./BookListTable";
import { withTranslation } from 'react-i18next';

class BookList extends React.Component {
    constructor(props) {
        super(props);
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : '';
        this.state = {
            error: null,
            isLoaded: false,
            books: [],
            notice: notice
        }
    };

    componentDidMount() {
        this.fetchBookList();
    };

    fetchBookList = () => {
        getBooksApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        books: data
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
        const {error, isLoaded, books} = this.state;
        let content;
        const { t } = this.props;

        if (error) {
            content = <p>{t('errors.error')} {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('ks.list.loading')}</p>
        } else {
            content = <BookListTable booksList={books}/>
        };

        return (
            <main>
                <h2>{t('ks.list.pageTitle')}</h2>
                {content}
                <p><Link to="/book/add" className="button-add">{t('ks.list.addNew')}</Link></p>
            </main>
        )
    };
};

export default withTranslation()(BookList);