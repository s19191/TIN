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

const swmSchema = Joi.object({
    Id_StanWMagazynie: Joi.number()
        .optional()
        .allow(""),
    Ksiazka_Id_Ksiazka: Joi.string()
        .required()
        .error(errMessages),
    Magazyn_Id_Magazyn: Joi.string()
        .required()
        .error(errMessages),
    IloscNaStanie: Joi.string()
        .required()
        .error(errMessages),
    CenaHurtowa: Joi.string()
        .error(errMessages),
    MinimalnaIloscDoCenyHurtowej: Joi.string()
        .error(errMessages),
    CenaDetaliczna: Joi.string()
        .required()
        .error(errMessages),
});

module.exports = swmSchema;