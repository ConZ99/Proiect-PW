const express = require('express');

const UsersManager = require('../../WebCore/Managers/UsersManager.js');
const UsersRepository = require('../../Infrastructure/PostgreSQL/Repository/UsersRepository.js');
const {
    authorizeAndExtractTokenAsync
} = require('../Filters/JWTFilter.js')
const {
    UserBody,
    UserRegisterRepsonse,
    UserLoginResponse
} = require ('../Models/Users.js');
const ResponseFilter = require('../Filters/ResponseFilter.js');
const AuthorizationFilter = require('../Filters/AuthorizationFilter.js');

const Router = express.Router();

Router.post('/register', async (req, res) => {

    const userBody = new UserBody(req.body);
    const user = await UsersManager.registerAsync(userBody.username, userBody.password, userBody.role_id);

    ResponseFilter.setResponseDetails(res, 201, new UserRegisterRepsonse(user));
});

Router.post('/login', async (req, res) => {

    const userBody = new UserBody(req.body);
    const userDto = await UsersManager.authenticateAsync(userBody.username, userBody.Password);
    const user = new UserLoginResponse(userDto.Token, userDto.Role);

    ResponseFilter.setResponseDetails(res, 200, user);
});

Router.get('/',authorizeAndExtractTokenAsync,  AuthorizationFilter.authorizeRoles(1), async (req, res) => {

    const users = await UsersRepository.getAllAsync();

    ResponseFilter.setResponseDetails(res, 200, users.map(user => new UserRegisterRepsonse(user)));
});

module.exports = Router;