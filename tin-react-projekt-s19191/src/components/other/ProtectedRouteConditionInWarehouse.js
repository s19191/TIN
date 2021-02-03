import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import { isAuthenticated } from '../../helpers/authHelper'

//Nie używane

class ProtectedRouteConditionInWarehouse extends React.Component {

    render() {
        return isAuthenticated()
            ? (<Route exact path={this.props.path} component={this.props.component}/> )
            : (<Redirect to="/conditionInWarehouse" />);
    }
}

export default ProtectedRouteConditionInWarehouse;