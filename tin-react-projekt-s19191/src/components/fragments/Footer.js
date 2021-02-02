import React from "react";
import {getCurrentUser, isAuthenticated} from "../../helpers/authHelper";

function Footer() {
    let who;
    if(isAuthenticated()) {
        const user = getCurrentUser();
        who = user.Name + " " + user.Surname + ", rola: " + user.Role;
    };
    return (
        <footer>
            {isAuthenticated()&&
                <p>Zalogowany jako: {who}</p>
            }
            {!isAuthenticated()&&
            <p>Nie zalogowany</p>
            }
            <p>Jan, Kwasowski, s19191</p>
        </footer>
    )
}

export default Footer;