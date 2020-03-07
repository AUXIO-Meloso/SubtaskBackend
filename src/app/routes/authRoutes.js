const { Router } = require('express'); // Importando apenas o router do express;
const authController = require('../controllers/authController'); // Funções utilizadas nas rotas
const authMiddleware = require('../middlewares/auth');

const routes = Router();

routes.post('/register', authController.register); // Rota de cadastro de usuário
routes.post('/authenticate', authController.authenticate); // Rota de autenticação de usuário (login)
routes.put('/forgot_password', authController.forgot_password); // Rota de recadastro de senha (enviar email)
routes.put('/reset_password', authController.reset_password);  // Rota de recadastro de senha (salvar senha)

// Usando o app como parâmetro passado e adicionando a rota /auth antes de inserir a rota /register ou /authenticate
module.exports = app => app.use('/auth', routes); 