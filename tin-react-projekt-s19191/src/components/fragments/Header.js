import React from "react";
import { useTranslation } from "react-i18next";

function Header() {
    const { t } = useTranslation();
    return (
        <header>
            <h1>{t('general.title')}</h1>
            <img src="/img/logo.jpg" alt="Księgarnia Dobra Książka Logo" />
        </header>
    )
};

export default Header;