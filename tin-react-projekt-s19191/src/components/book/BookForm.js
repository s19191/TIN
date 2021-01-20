import React from "react";
import { Link } from "react-router-dom";

class BookForm extends React.Component {
    render() {
        return (
            <main>
                <h2>Dodawanie książki</h2>
                <form className="form">
                    <label htmlFor="Tytul">Tytuł:<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" name="Tytul" id="Tytul" placeholder="2-60 znaków" value="" />
                    <span id="errorTytul" className="errors-text"></span>
                    <label htmlFor="Autor">Autor:<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" name="Autor" id="Autor" placeholder="2-60 znaków" value="" />
                    <span id="errorAutor" className="errors-text"></span>
                    <label htmlFor="DataWydania">Email:<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="date" name="DataWydania" id="DataWydania" placeholder="Data w formacie yyyy-MM-dd" value="" />
                    <span id="errorDataWydania" className="errors-text"></span>
                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text"></p>
                        <input className="form-button-submit" type="submit" value="Dodaj książkę" />
                        <Link to="/books" className="form-button-cancel">Anuluj</Link>
                    </div>
                </form>
            </main >
        )
    }
}

export default BookForm;