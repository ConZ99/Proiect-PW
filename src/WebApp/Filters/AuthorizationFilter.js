const ServerError = require('../Models/ServerError.js');

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        for (let i = 0; i < roles.length; i++) {
            console.log(req.user)
            console.log(req.userRole)
            console.log(roles)
            if (req.user.userRole === roles[i]) {
                    return next();
            }
        }
        throw new ServerError('Nu sunteti autorizat sa accesati resursa!', 401);
    }
};
 
module.exports = {
    authorizeRoles
}