import { getCurrentUser } from "../helpers/authHelper";

const conditionInWarehouseBaseUrl = 'http://localhost:3000/api/stanWMagazynie';

export function getConditionsInWarehousesApiCall() {
    const promise = fetch(conditionInWarehouseBaseUrl);
    return promise;
};

export function getConditionInWarehouseByIdApiCall(swmId) {
    const url = `${conditionInWarehouseBaseUrl}/${swmId}`;
    const promise = fetch(url);
    return promise;
};

export function addConditionInWarehouseApiCall(swm) {
    const swmString = JSON.stringify(swm);
    const user = getCurrentUser();
    let token;
    if (user && user.token) {
        token = user.token;
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: swmString
    };
    const promise = fetch(conditionInWarehouseBaseUrl, options);
    return promise;
};

export function updateConditionInWarehouseApiCall(swmId, swm) {
    const url = `${conditionInWarehouseBaseUrl}/${swmId}`;
    const swmString = JSON.stringify(swm);
    const user = getCurrentUser();
    let token;
    if (user && user.token) {
        token = user.token;
    };
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: swmString
    };
    const promise = fetch(url, options);
    return promise;
};

export function deleteConditionInWarehouseApiCall(swmId) {
    const url = `${conditionInWarehouseBaseUrl}/${swmId}`;
    const user = getCurrentUser();
    let token;
    if (user && user.token) {
        token = user.token;
    };
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    };
    const promise = fetch(url, options);
    return promise;
};