const mongoose = require('../../database'); // Arquivo com conexão do mongoose

const SubjectSchema = mongoose.Schema({ // Modelo de registro do mongoose
    title: {
        type: String, // TIPO
        require: true // OBRIGATORIEDADE
    },

    description: {
        type: String,
        require: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
 
    createdAt: {
        type: String,
        default: Date.now // RETORNA A DATA EM SEGUNDOS
    }
});

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;