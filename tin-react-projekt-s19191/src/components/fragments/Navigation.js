import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Strona główna</Link></li>
                <li><Link to="/books">Książki</Link></li>
                <li><Link to="/magazyn">Magazyny</Link></li>
                <li><Link to="/stanWMagazynie">Stan w magazynach</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation