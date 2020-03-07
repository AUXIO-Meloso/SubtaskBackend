require('dotenv').config(); // Variáveis de Ambiente
const express = require('express'); // Controles de rotas 
const cors = require('cors');

const app = express(); // Criando uma aplicação node

app.use(cors());
app.use(express.json()); // Dizendo a aplicação usar json como estrutura de dados entre o Back e Front
app.use(express.urlencoded({ extended: false })); // Troca de dados pela url 
require('./app/routes/index')(app);
app.listen(process.env.PORT || 3333); // Definindo a porta a ser utilizada