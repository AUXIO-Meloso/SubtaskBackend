const Task = require('../models/Task');
const Subject = require('../models/Subject');
const authMiddleware = require('../middlewares/auth');

module.exports = {

    async new_task(request, response) {
        try {
            const { title, description } = request.body;

            const subject = await Subject.findById(request.params.subjectId);

            if (!subject)
                return response.json({ error: "Subject not found" });

            if (!title) 
                return response.json({ error: "Title not informated" });

            if (!description) 
                return response.json({ error: "Description not informated" });

            const aux = await Task.create({ title, description, subject: request.params.subjectId, assignedTo: request.userId });

            subject.task.push(aux);

            await subject.save();

            return response.json({ aux });

        } catch(err) {
            return response.json({ error: "Cannot create a task" });
        }
    },

    async update_task(request, response) {
        try {
            const taskData = request.body;
            const tak = request.params.taskId;

            if(!tak)
                return response.json({ error: "Task id not informated" });

            if (taskData.title) {
                await Task.findByIdAndUpdate(tak, {
                    '$set': {
                        title: taskData.title
                    }
                });
            };

            if (taskData.description) {
                await Task.findByIdAndUpdate(tak, {
                    '$set': {
                        description: taskData.description
                    }
                });
            };

            if (taskData.completed  && (taskData.completed === false || taskData.completed === true)) {
                await Task.findByIdAndUpdate(tak, {
                    '$set': {
                        completed: taskData.completed
                    }
                });
            }

        const tempTask = await Task.findById(tak, {}, { new: true });

        return response.json({ tempTask });
        } catch(err) {
            return response.json({ error: "Cannot update task" });
        }
    },   

    async delete_task(request, response) {
        let deleteTask = request.params.taskId;

        if (!deleteTask)
            return response.json({ error: "Id not informated" });

        deleteTask = await Task.findById(request.params.taskId);

        if (!deleteTask) 
            return response.json({ error: "Task not found" });

        try {
            await Task.deleteOne({
                _id: request.params.taskId
            }, async function(err, result) {

                if (err) 
                    return response.json({ message: "Error on delete" });

                await Subject.findByIdAndUpdate(deleteTask.subject, {
                    '$pull': {
                        task: {'$in': [request.params.taskId]}
                    }
                })

            });

            return response.json({ message: "Task deleted!" });

        } catch (error) {
            return response.json({ error: "Error on delete a task" })
        }
    }

}