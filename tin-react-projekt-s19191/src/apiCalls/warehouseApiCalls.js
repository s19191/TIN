import { warehouseDetailsList } from './warehouseApiMockData';
const booksBaseUrl = 'http://localhost:3000/api/magazyny';

export function getWarehousesApiCall() {
    const promise = fetch(booksBaseUrl);
    return promise;
}

export function getWarehouseByIdApiCall(magId) {
    const mag = warehouseDetailsList.find(warehouse => warehouse.Id_Magazyn === magId)
    return mag;
}