import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated, isCreatorOrAdmin } from '../../helpers/authHelper';
import { getConditionInWarehouseByIdApiCall } from "../../apiCalls/conditionInWarehouseApiCalls";

function ProtectedRouteConditionInWarehouse({ component: Component, ...rest }) {
    // let book = getConditionInWarehouseByIdApiCall(rest.computedMatch.params.swmId);
    // let creatorId = book.User_Id_User;

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
                // (isAuthenticated() && isCreatorOrAdmin(creatorId)) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/conditionInWarehouse",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

export default ProtectedRouteConditionInWarehouse;