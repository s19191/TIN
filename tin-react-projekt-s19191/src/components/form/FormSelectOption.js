import React from "react";
import {isCreatorOrAdmin} from "../../helpers/authHelper";

function FormSelectOption(props) {
    const element = props.element;
    const whitch = props.name;
    let text = '';
    let id = '';
    if(whitch === 'Ksiazka_Id_Ksiazka') {
        text = element.Tytul;
        id = element.Id_Ksiazka;
    } else {
        text = element.Nazwa;
        id = element.Id_Magazyn;
    };
    if (isCreatorOrAdmin(element.User_Id_User) && whitch === "Magazyn_Id_Magazyn") {
        return (
            <React.Fragment>
                <option selected={id === props.id} label={text}>{id}</option>
            </React.Fragment>
        )
    } else if (whitch === "Ksiazka_Id_Ksiazka") {
        return (
            <React.Fragment>
                <option selected={id === props.id} label={text}>{id}</option>
            </React.Fragment>
        )
    } else {
        return (
            <span></span>
        )
    };
};

export default FormSelectOption;