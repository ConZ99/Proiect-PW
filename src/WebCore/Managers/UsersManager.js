const UsersRepository = require('../../Infrastructure/PostgreSQL/Repository/UsersRepository.js');
const AuthenticatedUserDto = require('../DTOs/AuthenticatedUserDto.js');
const RegisteredUserDto = require('../DTOs/RegisteredUserDto.js');
const JwtPayloadDto = require('../DTOs/JwtPayloadDto.js');

const {
    hashPassword,
    comparePlainTextToHashedPassword
} = require('../Security/Password/index.js')

const {
    generateTokenAsync,
    verifyAndDecodeDataAsync
} = require('../Security/Jwt/index.js')

const authenticateAsync = async (username, hashedPassword) => {

    console.info(`Authenticates user with username ${username}`);
    console.log(username)
    const user = await UsersRepository.getByUsername(username);
    console.log(user)
    
    if (!user) {
        throw new ServerError(`Utilizatorul cu username ${username} nu exista in sistem!`, 404);
    }

    if (comparePlainTextToHashedPassword(user.password, hashedPassword))
    {
        const pay = new JwtPayloadDto(user.id, user.role_id)
        const accessToken = await generateTokenAsync(pay)
        return new AuthenticatedUserDto(accessToken, username, user.role_id)
    }
    else 
        throw new ServerError("Eroare la decriptarea parolei!", 400);
};

const registerAsync = async (username, plainTextPassword, role) => {
    const hashedPassword = await hashPassword(plainTextPassword)
    const user = await UsersRepository.addAsync(username, hashedPassword, role)
    return new RegisteredUserDto(user.id, user.username, user.role_id);
};

module.exports = {
    authenticateAsync,
    registerAsync
}