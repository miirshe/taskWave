const { boardModel } = require("../model/schemas/boardModel");

exports.createBoard = async (req, res) => {
    try {
        const { title, description, color } = req.body;
        const isExistBoard = await boardModel.exists({ title: title })

        if (isExistBoard) {
            return res.json({
                status: false,
                message: 'board already exist'
            })
        }

        const createBoard = await boardModel.create({
            title: title,
            description: description,
            color: color,
            userId: req.userId
        })

        if (!createBoard) {
            return res.json({
                status: false,
                message: 'board not created'
            })
        }

        return res.json({
            status: true,
            message: 'board created successfully'
        })

    } catch (error) {
        console.log('error creating board', error);
        res.json({
            status: false,
            message: error.message
        })
    }
}

exports.updateBoard = async (req, res) => {
    try {
        const { title, description, color } = req.body;
        const id = req.params.id;
        const isExistBoard = await boardModel.findById({ _id: id })

        if (!isExistBoard) {
            return res.json({
                status: false,
                message: 'board not  exist'
            })
        }

        const updateBoard = await boardModel.updateOne({ _id: id }, {
            $set: {
                title: title,
                description: description,
                color: color,
            }
        })

        if (!updateBoard) {
            return res.json({
                status: false,
                message: 'board not update'
            })
        }

        return res.json({
            status: true,
            message: 'board update successfully'
        })

    } catch (error) {
        console.log('error updating board', error);
        res.json({
            status: false,
            message: error.message
        })
    }
}

exports.getUserBoards = async (req, res) => {
    try {
        const userId = req.userId;
        const userBoards = await boardModel.find({ userId: userId })
        if (userBoards.length < 0) {
            return res.json({
                status: false,
                message: 'board not found'
            })
        }
        return res.json({
            status: true,
            userBoards
        })

    } catch (error) {
        console.log('error getting user boards', error);
        res.json({
            status: false,
            message: error.message
        })
    }
}


exports.deleteBoard = async (req, res) => {
    try {
        const id = req.params.id;
        const isExistBoard = await boardModel.findById({ _id: id })

        if (!isExistBoard) {
            return res.json({
                status: false,
                message: 'board not  exist'
            })
        }

        const deleteBoard = await boardModel.deleteOne({ _id: id })
        if (!deleteBoard) {
            return res.json({
                status: false,
                message: 'board not found'
            })
        }
        return res.json({
            status: true,
            message : 'board deleted successfully'
        })

    } catch (error) {
        console.log('error delete user board', error);
        res.json({
            status: false,
            message: error.message
        })
    }
}