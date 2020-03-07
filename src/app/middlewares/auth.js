const jwt = require('jsonwebtoken'); // Importando biblioteca de tokens
const authConfig = require('../../config/auth.json') // Arquivo json com a propriedade secret( key de geração de token )

module.exports = (request, response, next) => { // Middlewares devem utilizar o next() para permitir a conexão
    const authHeader = request.headers.authorization; // Token passado pelo frontend para a validação

    // Se o token foi passado
    if (!authHeader)
        return response.status(401).json({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    // Se o token está estruturado na forma correta ('Baerer' + 'token');
    if(!parts.length === 2)
        return response.status(401).json({ error: 'Token error (Bearer + Token => Falar com Meloso)' });

    const [ scheme, token ] = parts; // Desestruturação de um vetor

    // Reject
    // Conferir se está escrito 'Baerer' na constante scheme
    if(!/^Bearer$/i.test(scheme))
        return response.status(401).json({ error: 'Token malformatted' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return response.status(401).json({ error: 'Invalid Token' });

        request.userId = decoded.id;

        return next();
    });

}