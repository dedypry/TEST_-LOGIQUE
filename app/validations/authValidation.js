const Joi = require('joi');
const JoiException = require('../exceptions/joiException');

async function loginValidation(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const {error} = schema.validate(req.body, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) throw new JoiException(error);

  return next();
}

async function queryValidation(req, res, next) {
  const schema = Joi.object({
    q: Joi.string(),
    ob: Joi.string().valid('name', 'email'),
    sb: Joi.string().valid('desc', 'asc'),
    of: Joi.number(),
    lt: Joi.number(),
  });

  const {error} = schema.validate(req.query, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) throw new JoiException(error);

  return next();
}

async function signupValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required()
        .messages({
          'any.required': 'Please provide name fields.',
          'string.empty': 'Please provide name fields.',
        }),
    address: Joi.string().required()
        .messages({
          'string.empty': 'Please provide address fields.',
        }),
    email: Joi.string().email().required()
        .messages({
          'string.empty': 'Please provide Email fields.',
        }),
    password: Joi.string().required()
        .messages({
          'string.empty': 'Please provide password fields.',
        }),
    photos: Joi.array().required()
        .messages({
          'string.empty': 'Please provide photos fields.',
        }),
    creditcard_type: Joi.string().required()
        .messages({
          'string.empty': 'Please provide credit card type fields.',
        }),
    creditcard_number: Joi.string().regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/).required()
        .messages({
          'string.empty': 'Please provide credit card number fields.',
          'string.pattern.base': 'Credit card data invalid.',
        }),
    creditcard_name: Joi.string().required()
        .messages({
          'string.empty': 'Please provide credit card name fields.',
        }),
    creditcard_expired: Joi.string().required()
        .messages({
          'string.empty': 'Please provide credit card expired fields.',
        }),
    creditcard_cvv: Joi.string().min(3).required()
        .messages({
          'string.empty': 'Please provide credit card cvv fields.',
        }),
  });

  const {error} = schema.validate(req.body, {
    allowUnknown: false,
    abortEarly: false,
  });

  if (error) throw new JoiException(error);

  return next();
}

async function updateValidation(req, res, next) {
  const schema = Joi.object({
    user_id: Joi.string().required()
        .messages({
          'any.required': 'Please provide User ID fields.',
          'string.empty': 'Please provide User ID fields.',
        }),
    name: Joi.string().required()
        .messages({
          'any.required': 'Please provide name fields.',
          'string.empty': 'Please provide name fields.',
        }),
    address: Joi.string().required()
        .messages({
          'string.empty': 'Please provide address fields.',
        }),
    email: Joi.string().email().required()
        .messages({
          'string.empty': 'Please provide Email fields.',
        }),
    password: Joi.string().required()
        .messages({
          'string.empty': 'Please provide password fields.',
        }),
    photos: Joi.array().required()
        .messages({
          'string.empty': 'Please provide photos fields.',
        }),
    creditcard_type: Joi.string().required()
        .messages({
          'string.empty': 'Please provide credit card type fields.',
        }),
    creditcard_number: Joi.string().regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/).required()
        .messages({
          'string.empty': 'Please provide credit card number fields.',
          'string.pattern.base': 'Credit card data invalid.',
        }),
    creditcard_name: Joi.string().required()
        .messages({
          'string.empty': 'Please provide credit card name fields.',
        }),
    creditcard_expired: Joi.string().required()
        .messages({
          'string.empty': 'Please provide credit card expired fields.',
        }),
    creditcard_cvv: Joi.string().min(3).required()
        .messages({
          'string.empty': 'Please provide credit card cvv fields.',
        }),
  });

  const {error} = schema.validate(req.body, {
    allowUnknown: false,
    abortEarly: false,
  });

  if (error) throw new JoiException(error);

  return next();
}

module.exports ={
  loginValidation,
  queryValidation,
  signupValidation,
  updateValidation,
};

