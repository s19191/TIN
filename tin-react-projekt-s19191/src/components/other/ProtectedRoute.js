import React from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../helpers/authHelper';


class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        return isAuthenticated() ? (
            <Component />
        ) : (
            <Redirect to="/" />
        );
    };
};

export default ProtectedRoute;