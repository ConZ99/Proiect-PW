const ServerError = require('./ServerError.js');

class UserBody {
    constructor (body) {

        if (!body.username) {
            throw new ServerError("Username is missing", 400);
        }
    
        if (!body.password) {
            throw new ServerError("Password is missing", 400);
        }

        if (!body.role_id) {
            this.role_id = 3;
        }
        else
        {
            this.role_id = body.role_id;
        }

        if (body.password.length < 4) {
            throw new ServerError("Password is too short!", 400);
        }

        this.username = body.username;
        this.password = body.password;
    }

    get Username () {
        return this.username;
    }

    get Password () {
        return this.password;
    }

    get Role () {
        return this.role_id;
    }
}

class UserRegisterRepsonse {
    constructor(user) {
        this.username = user.username;
        this.id = user.id;
        this.role_id = user.role_id;
    }
}
class UserLoginResponse {
    constructor(token, role) {
        this.role_id = role;
        this.token = token;
    }
}
module.exports =  {
    UserBody,
    UserLoginResponse,
    UserRegisterRepsonse
}