import { conditionInwarehouseList, conditionInwarehouseDetailsList } from './conditionInwarehouseApiMockData'

export function getConditionsInwarehousesApiCall() {
    return conditionInwarehouseList;
}

export function getConditionInwarehouseByIdApiCall(swmId) {
    const swm = conditionInwarehouseDetailsList.find(conditionInwarehouse => conditionInwarehouse.Id_StanWMagazynie === swmId)
    return swm;
}