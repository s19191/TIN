import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Strona główna</Link></li>
                <li><Link to="/books">Książki</Link></li>
                <li><Link to="/warehouse">Magazyny</Link></li>
                <li><Link to="/conditionInwarehouse">Stan w magazynach</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation