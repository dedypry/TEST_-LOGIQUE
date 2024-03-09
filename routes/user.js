const express = require('express');
const routes = new express.Router();

const userController = require('../app/http/controllers/userController');
const {handlerException} = require('../app/exceptions/handler');
const {signupValidation, queryValidation, updateValidation} = require('../app/validations/authValidation');
const {auth} = require('../app/http/middleware/auth');


/* GET home page. */
routes.group('/user', (router)=> {
  router.patch('/', auth(), handlerException(updateValidation), handlerException(userController.update));
  router.post('/register', auth(), handlerException(signupValidation), handlerException(userController.signUp));
  router.get('/list', auth(), handlerException(queryValidation), handlerException(userController.list));
  router.get('/:user_id', auth(), handlerException(queryValidation), handlerException(userController.detail));
});
module.exports = routes;
