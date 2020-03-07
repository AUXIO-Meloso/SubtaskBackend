const { Router } = require('express'); // Importando apenas o router do express;
const taskController = require('../controllers/taskController'); // Funções utilizadas nas rotas
const authMiddleware = require('../middlewares/auth');

const routes = Router();

routes.post('/new_task/:subjectId', authMiddleware, taskController.new_task); // Rota de criação de task;
routes.put('/update_task/:taskId', authMiddleware, taskController.update_task); // Rota de edição de task;
routes.delete('/delete_task/:taskId', authMiddleware, taskController.delete_task); // Rota de exclusão de task;

// Usando o app como parâmetro passado e adicionando a rota /task antes de inserir as devidas rotas
module.exports = app => app.use('/task', routes); 