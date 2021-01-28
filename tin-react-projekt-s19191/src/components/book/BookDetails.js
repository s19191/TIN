import React from 'react';
import { Link } from 'react-router-dom';
import { getBookByIdApiCall } from '../../apiCalls/bookApiCalls';
import BookDetailsData from "./BookDetailsData";

class BookDetails extends React.Component {
    constructor(props) {
        super(props)
        let { ksId } = props.match.params
        this.state = {
            ksId: ksId,
            book: null,
            error: null,
            isLoaded: false,
            message: null
        }
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
                })
    };

    render() {
        const { book, error, isLoaded, message } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych książki...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <BookDetailsData bookData={book} />
        }
        return (
            <main>
                <h2>Szczegóły książki</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/book" className="list-actions-button-details">Powrót</Link>
                </div>
            </main>
        )
    };
};

export default BookDetails;