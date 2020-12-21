const Joi = require('joi');

const magSchema = Joi.object({
    Id_StanWMagazynie: Joi.number()
        .optional()
        .allow(""),
    Adres: Joi.string()
        .min(2)
        .max(60)
        .required(),
    Nazwa: Joi.string()
        .min(2)
        .max(60)
        .required()
});

module.exports = magSchema;