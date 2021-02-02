import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated, isCreatorOrAdmin } from '../../helpers/authHelper';
import { getWarehouseByIdApiCall } from "../../apiCalls/warehouseApiCalls";

function ProtectedRouteWarehouse({ component: Component, ...rest }) {
    // let book = getWarehouseByIdApiCall(rest.computedMatch.params.magId);
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
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

export default ProtectedRouteWarehouse;