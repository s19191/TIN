import { warehouseList, warehouseDetailsList } from './warehouseApiMockData'

export function getWarehousesApiCall() {
    return warehouseList;
}

export function getWarehouseByIdApiCall(magId) {
    const mag = warehouseDetailsList.find(warehouse => warehouse.Id_Magazyn === magId)
    return mag;
}