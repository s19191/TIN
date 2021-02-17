const formMode = {
    NEW: 'NEW',
    EDIT: 'EDIT'
};

export default formMode;

export const formValidationKeys = {
    notEmpty: 'notEmpty',
    len_2_60: 'len_2_60',
    isDate: 'isDate',
    isNotFutureDate: 'isNotFutureDate',
    isCorrectAdress: 'isCorrectAdress',
    isNumber: 'isNumber',
    isNumberPlus: 'isNumberPlus',
    isEmail: 'isEmail'
};

export function getValidationErrorKey(error) {
    return `validationMessage.${error}`
};