import React from "react";
import { getCurrentUser, isAuthenticated } from "../../helpers/authHelper";
import { useTranslation } from "react-i18next";

function Footer() {
    const { t } = useTranslation();
    let who;
    if(isAuthenticated()) {
        const user = getCurrentUser();
        who = user.Name + " " + user.Surname + t('footer.role') + user.Role;
    };

    return (
        <footer>
            {isAuthenticated()&&
                <p>{t('footer.loggedInInformation')} {who}</p>
            }
            {!isAuthenticated()&&
            <p>{t('footer.loggedOutInformation')}</p>
            }
            <p>{t('footer.author')}Jan, Kwasowski, s19191</p>
        </footer>
    )
};

export default Footer;