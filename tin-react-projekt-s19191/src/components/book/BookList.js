import React from 'react';
import { getBooksApiCall } from '../../apiCalls/bookApiCalls';
import { Link } from 'react-router-dom';
import BookListTable from "./BookListTable";

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            books: []
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
        const {error, isLoaded, books} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych książek...</p>
        } else {
            content = <BookListTable booksList={books}/>
        }

        return (
            <main>
                <h2>Lista książek</h2>
                {content}
                <p><Link to="/books/add" className="button-add">Dodaj nową książkę</Link></p>
            </main>
        )
    };

}

export default BookList;