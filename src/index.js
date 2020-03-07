require('dotenv').config(); // Variáveis de Ambiente
const cors = require('cors');
const express = require('express'); // Controles de rotas 

const app = express(); // Criando uma aplicação node

app.use(cors());
app.use(express.json()); // Dizendo a aplicação usar json como estrutura de dados entre o Back e Front
app.use(express.urlencoded({ extended: false })); // Troca de dados pela url 
require('./app/routes/index')(app);
app.listen(3333); // Definindo a porta a ser utilizada