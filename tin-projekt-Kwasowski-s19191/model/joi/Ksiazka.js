const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            case "string.email":
                err.message = `Pole powinno zawierać prawidłowy adres email`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const ksSchema = Joi.object({
    Id_Ksiazka: Joi.number()
        .optional()
        .allow(""),
    Tytul: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    Autor: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    DataWydania: Joi.string()
        .required()
        .error(errMessages),
});

module.exports = ksSchema;