const {
    queryAsync
} = require('..');

const getAllAsync = async() => {
    console.info ('Getting all users from database');
    
    return await queryAsync('SELECT * FROM users');
};

const addAsync = async (username, password, role) => {
    console.info(`Adding user ${username}`);

    const users = await queryAsync('INSERT INTO users (username, password, role_id, joined, views) VALUES ($1, $2, $3, NOW(), 0) RETURNING id, username, role_id', [username, password, role]);
    return users[0];
};

const getByUsername = async (username) => {
    console.info(`Getting user with username ${username}`);
    
    const users = await queryAsync(`SELECT * FROM users WHERE username = $1`, [username]);
    return users[0];
};

module.exports = {
    getAllAsync,
    addAsync,
    getByUsername
}