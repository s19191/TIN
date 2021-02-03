import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {isAuthenticated, isCreatorOrAdmin} from '../../helpers/authHelper';
import {getBookByIdApiCall} from "../../apiCalls/bookApiCalls";

//Nie używane

function ProtectedRouteBook({ component: Component, ...rest }) {

    let book = getBookByIdApiCall(rest.computedMatch.params.ksId);
    let userId = book.User_Id_User;

    return (
        <Route
            {...rest}
            render={props =>
                (isAuthenticated() && isCreatorOrAdmin(userId)) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/book",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

export default ProtectedRouteBook;