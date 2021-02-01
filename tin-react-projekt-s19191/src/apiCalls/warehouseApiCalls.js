const warehouseBaseUrl = 'http://localhost:3000/api/magazyny';

export function getWarehousesApiCall() {
    const promise = fetch(warehouseBaseUrl);
    return promise;
};

export function getWarehouseByIdApiCall(magId) {
    const url = `${warehouseBaseUrl}/${magId}`;
    const promise = fetch(url);
    return promise;
};

export function addWarehouseApiCall(mag) {
    const magString = JSON.stringify(mag);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: magString
    }
    const promise = fetch(warehouseBaseUrl, options);
    return promise;
};

export function updateWarehouseApiCall(magId, mag) {
    const url = `${warehouseBaseUrl}/${magId}`;
    const magString = JSON.stringify(mag);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: magString
    }
    const promise = fetch(url, options);
    return promise;
};