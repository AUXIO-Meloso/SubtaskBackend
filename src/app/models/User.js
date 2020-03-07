const mongoose = require('../../database'); // Arquivo com conexão do mongoose
const bcrypt = require('bcryptjs'); // Encriptador de strings

const UserSchema = mongoose.Schema({ // Modelo de registro do mongoose
    name: {
        type: String, // TIPO
        require: true // OBRIGATORIEDADE
    },
    email: {
        type: String,
        unique: true, // UNICO (Gera um erro se tiver outro igual)
        lowercase: true, // APENAS LETRAS MINUSCULAS
        require: true
    },
    password: {
        type: String,
        require: true, 
        select: false // NAO APARECER NO ARRAY DE USUARIOS
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type: String,
        default: Date.now // RETORNA A DATA EM SEGUNDOS
    }
});

// Função executada antes de salvar o schema no banco de dados
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10); //  Criando um hash para armazenar a senha criptografada
    this.password = hash;

    next(); // Permite a continuação do salvamento
});

const User = mongoose.model('User', UserSchema);

module.exports = User;