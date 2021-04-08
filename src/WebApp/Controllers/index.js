const Router = require('express')();

//const AuthorsController = require('./AuthorsController.js');
const {
    authorizeAndExtractTokenAsync 
    } = require('../Filters/JWTFilter.js')

const UsersController = require('./UsersController.js');
/**
 * TODO import controllers
 */

//Router.use('/v1/authors', authorizeAndExtractTokenAsync, AuthorsController);
Router.use('/v1/users', authorizeAndExtractTokenAsync, UsersController);
/**
 * TODO add controllers to main router
 */

module.exports = Router;