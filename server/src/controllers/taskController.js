const { taskModel } = require("../model/schemas/taskModel");

exports.createTasks = async (req, res) => {
    try {
        const { title, description, boardId , status  } = req.body;
        const createTasks = await taskModel.create({
            title: title,
            description: description,
            boardId: boardId,
            userId: req.userId,  
        })

        if (!createTasks) {
            return res.json({
                status: false,
                message: 'task not created'
            })
        }

        return res.json({
            status: true,
            message: 'task created successfully'
        })

    } catch (error) {
        console.log('error creating task', error);
        res.json({
            status: false,
            message: error.message
        })
    }
}

exports.updateTasks = async (req, res) => {
    try {
        const { title, description, boardId , status } = req.body;
        const id = req.params.id;
        const isExistTask = await taskModel.findById({ _id: id })

        if (!isExistTask) {
            return res.json({
                status: false,
                message: 'task not  exist'
            })
        }

        const updateTasks = await taskModel.updateOne({ _id: id }, {
            $set: {
                title: title,
                description: description,
                boardId : boardId,
                status : status
            }
        })

        if (!updateTasks) {
            return res.json({
                status: false,
                message: 'task not update'
            })
        }

        return res.json({
            status: true,
            message: 'task update successfully'
        })

    } catch (error) {
        console.log('error updating task', error);
        res.json({
            status: false,
            message: error.message
        })
    }
}

exports.getUserTasks = async (req, res) => {
    try {
        const userId = req.userId;
        const userTasks = await taskModel.find({ userId: userId })
        if (userTasks.length < 0) {
            return res.json({
                status: false,
                message: 'task not found'
            })
        }
        return res.json({
            status: true,
            userTasks
        })

    } catch (error) {
        console.log('error getting user task', error);
        res.json({
            status: false,
            message: error.message
        })
    }
}


exports.deleteTasks = async (req, res) => {
    try {
        const id = req.params.id;
        const isExistTask = await taskModel.findById({ _id: id })

        if (!isExistTask) {
            return res.json({
                status: false,
                message: 'task not  exist'
            })
        }

        const deleteTasks = await taskModel.deleteOne({ _id: id })
        if (!deleteTasks) {
            return res.json({
                status: false,
                message: 'task not found'
            })
        }
        return res.json({
            status: true,
            message : 'task deleted successfully'
        })

    } catch (error) {
        console.log('error delete user task', error);
        res.json({
            status: false,
            message: error.message
        })
    }
}