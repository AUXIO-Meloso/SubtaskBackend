const mongoose = require('../../database'); // Arquivo com conexão do mongoose
const Subject = require('./Subject');

const TaskSchema = mongoose.Schema({ // Modelo de registro do mongoose
    title: {
        type: String, // TIPO
        require: true // OBRIGATORIEDADE
    },

    description: {
        type: String,
        require: true
    },

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        require: true
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    completed: {
        type: Boolean,
        required: true,
        default: false
    },

    createdAt: {
        type: String,
        default: Date.now // RETORNA A DATA EM SEGUNDOS
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;