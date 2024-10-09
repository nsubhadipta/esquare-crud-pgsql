const Joi = require("joi");

const userSchema = {
 userAdd: Joi.object().keys({
    name: Joi.string().max(50).required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    age: Joi.number().integer().positive().required(),
  }),

  userEdit: Joi.object().keys({
    name: Joi.string().max(50).required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    age: Joi.number().integer().positive().required(),
  }),

};
module.exports = userSchema;