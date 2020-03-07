const { Router } = require('express'); // Controle de rotas
const subjectController = require('../controllers/subjectController'); // Funções usadas nas rotas
const authMiddleware = require('../middlewares/auth'); // Middleware de controle de autenticação (token)

const routes = Router(); // Definindo uma constante a partir do Router do express;

// Foi inserido a função authMiddleware para validar token e devolver o id do usuário;
routes.get('/', authMiddleware, subjectController.index); // Rota de listagem de matérias;
routes.get('/:subjectId', authMiddleware, subjectController.show); // Rota de exibição de uma matéria; 
routes.post('/', authMiddleware, subjectController.create); // Rota de criação de uma matéria;
routes.put('/:subjectId', authMiddleware, subjectController.update); // Rota de edição de uma matéria;
routes.delete('/:subjectId', authMiddleware, subjectController.delete); // Rota de exclusão de uma matéria;

// Usando o app como parâmetro passado e adicionando a rota /subject antes de inserir as devidas rotas
module.exports = app => app.use('/subject', routes); 