import React from 'react'
import { Link } from 'react-router-dom'
import { getBooksApiCall } from '../../apiCalls/bookApiCalls'
import { getWarehousesApiCall } from '../../apiCalls/warehouseApiCalls'

class ConditionInwarehouseForm extends React.Component {
    render() {
        const allKs = getBooksApiCall()
        const allMag = getWarehousesApiCall()

        return (
            <main>
                <h2>Dodawanie stanu książki w konretnym magazynie</h2>
                <form className="form">
                    <label htmlFor="Ksiazka_Id_Ksiazka">Książka: <abbr title="required" aria-label="required">*</abbr></label>
                    <select id="Ksiazka_Id_Ksiazka" name="Ksiazka_Id_Ksiazka" required>
                        <option value="">-- Wybierz książkę --</option>
                        {allKs.map(ks =>
                            (<option key={ks.Id_Ksiazka} value={ks.Id_Ksiazka} label={ks.Tytul}></option>)
                        )}
                    </select>
                    <span id="errorKsiazka_Id_Ksiazka" className="errors-text"></span>
                    <label htmlFor="Magazyn_Id_Magazyn">Magazyn: <abbr title="required" aria-label="required">*</abbr></label>
                    <select id="Magazyn_Id_Magazyn" name="Magazyn_Id_Magazyn" required>
                        <option value="">-- Wybierz magazyn --</option>
                        {allMag.map(mag =>
                            (<option key={mag.Id_Magazyn} value={mag.Id_Magazyn} label={mag.Nazwa}></option>)
                        )}
                    </select>
                    <span id="errorMagazyn_Id_Magazyn" className="errors-text"></span>
                    <label htmlFor="IloscNaStanie">Ilość na stanie: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="number" name="IloscNaStanie" id="IloscNaStanie" min={0} value="" />
                    <span id="errorIloscNaStanie" className="errors-text"></span>
                    <label htmlFor="CenaHurtowa">Cena hurtowa:</label>
                    <input type="number" name="CenaHurtowa" id="CenaHurtowa" min={0} step={0.1} value="" />
                    <span id="errorCenaHurtowa" className="errors-text"></span>
                    <label htmlFor="MinimalnaIloscDoCenyHurtowej">Minimalna ilość zamówienia potrzebna do naliczenia ceny hurowej:</label>
                    <input type="number" name="MinimalnaIloscDoCenyHurtowej" id="MinimalnaIloscDoCenyHurtowej" min={0} value="" />
                    <span id="errorMinilamnaIloscDoCenyHurtowej" className="errors-text"></span>
                    <label htmlFor="CenaDetaliczna">Cena detaliczna: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="number" name="CenaDetaliczna" id="CenaDetaliczna" min={0} step={0.1} value="" />
                    <span id="errorCenaDetaliczna" className="errors-text"></span>
                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text"></p>
                        <input className="form-button-submit" type="submit" value="Dodaj stan książki w konkretnym magazynie" />
                        <Link to="/conditionInwarehouse" className="form-button-cancel">Anuluj</Link>
                    </div>
                </form>
            </main>
        )
    }
}

export default ConditionInwarehouseForm