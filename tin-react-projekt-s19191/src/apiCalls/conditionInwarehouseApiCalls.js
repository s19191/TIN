import { conditionInwarehouseDetailsList } from './conditionInwarehouseApiMockData';
const booksBaseUrl = 'http://localhost:3000/api/stanWMagazynie';

export function getConditionsInwarehousesApiCall() {
    const promise = fetch(booksBaseUrl)
    return promise;
}

export function getConditionInwarehouseByIdApiCall(swmId) {
    const swm = conditionInwarehouseDetailsList.find(conditionInwarehouse => conditionInwarehouse.Id_StanWMagazynie === swmId)
    return swm;
}