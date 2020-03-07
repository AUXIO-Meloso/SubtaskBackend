const jwt = require('jsonwebtoken');    // Gerador de Tokens de autenticação
const authConfig = require('../../config/auth.json');

const genToks = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

module.exports = genToks;