import React from "react";
import { Link } from "react-router-dom";

class WarehouseForm extends React.Component {
    render() {
        return (
            <main>
                <h2>Dodawanie magazynu</h2>
                <form className="form">
                    <label htmlFor="Nazwa">Nazwa:<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" name="Nazwa" id="Nazwa" placeholder="2-60 znaków" value="" />
                    <span id="errorName" className="errors-text"></span>
                    <label htmlFor="Adres">Adres:<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" name="Adres" id="Adres" placeholder="2-60 znaków" value="" />
                    <span id="errorAdress" className="errors-text"></span>
                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text"></p>
                        <input className="form-button-submit" type="submit" value="Dodaj magazyn" />
                        <Link to="/warehouse" className="form-button-cancel">Anuluj</Link>
                    </div>
                </form>
            </main >
        )
    }
}

export default WarehouseForm