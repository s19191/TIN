import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { isAuthenticated } from "../../helpers/authHelper";

class Navigation extends React.Component {
    handleLanguageChange = (language) => {
        const { i18n } = this.props
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
        });
    }
    render() {
        const { t } = this.props;
        const loginLogoutLink = isAuthenticated() ? <button onClick={this.props.handleLogout}>{t('authentication.actions.logOut')}</button> : <Link to="/login">{t('authentication.actions.logIn')}</Link>;
        return (
            <nav>
                <ul>
                    <li><Link to="/">{t('nav.main-page')}</Link></li>
                    <li><Link to="/book">{t('nav.ksiazki')}</Link></li>
                    <li><Link to="/warehouse">{t('nav.magazyny')}</Link></li>
                    <li><Link to="/conditionInWarehouse">{t('nav.stanyWMgazynach')}</Link></li>
                    {!isAuthenticated() &&
                    <li className='lang'><Link to="/register">{t('nav.register')}</Link></li>
                    }
                    <li className='lang'>{loginLogoutLink}</li>
                    <li><button onClick={() => { this.handleLanguageChange('pl') }}>PL</button></li>
                    <li><button onClick={() => { this.handleLanguageChange('en') }}>EN</button></li>
                </ul>
            </nav>
        )
    }
};

export default withTranslation()(Navigation);