const Subject = require('../models/Subject');
const Task = require('../models/Task');
const User = require('../models/User');

module.exports = {
    async index(request, response) {
        try {
            const subjects = await Subject.find({  
                user: request.userId
            }).populate('task');

            return response.json({ subjects });
        } catch (err) {
            return response.json({ error: 'Error on list subjects' });
        }
    },

    async show(request, response) {
        try {
            const subject = await Subject.findById(request.params.subjectId).populate('task');

            if (!subject) 
                return response.json({ error: "Subject not found" })

            return response.json({ subject });
        } catch (err) {
            return response.json({ error: 'Error on loading subject' });
        }
    },

    async create(request, response) {
        try {
            const { title, description, tasks } = request.body;

            if (!title) {
                return response.json({ error: "Title not informated" })
            }

            if (!description) {
                return response.json({ error: "Description not informated" })
            }

            const subject = await Subject.create({ 
                title, 
                description, 
                user: request.userId 
            });

            if (tasks) {
                await Promise.all(tasks.map(async task => {
                    const subjectTask = await Task.create({ ...task, subject: subject._id, assignedTo: request.userId});
                    subject.task.push(subjectTask);
                }));

                await subject.save();
            }

            return response.json({ subject });
        } catch (err) {
            return response.json({ error: 'Cannot create a subject' });
        }
    },

    async update(request, response) {
        try {
            const { title, description } = request.body;

            if (!title) {
                return response.json({ error: "Title not informated" });
            }

            if (!description) {
                return response.json({ error: "Description not informated" });
            }

            const updateSubject = await Subject.findByIdAndUpdate(request.params.subjectId, {
                '$set': {
                    title,
                    description
                }
            }, { new: true});

            return response.json({ updateSubject });

        } catch(err) {
            return response.json({ error: "Cannot update" });
        }
    },

    async delete(request, response) {
        try {
            const deleteTasks = await Subject.findById(request.params.subjectId);

            await Promise.all(deleteTasks.task.map(async tasks =>{
                await Task.findByIdAndRemove(tasks._id);
            }));

            await Subject.findByIdAndRemove(request.params.subjectId);

            return response.json();
        } catch (err) {
            console.log(err);
            return response.json({ error: 'Error on deleting subject' });
        }
    }
};