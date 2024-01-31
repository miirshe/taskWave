const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { userModel } = require('../model/schemas/userModel');
const { jwt_secret } = require('../lib/lib');
//user register api endpoint
const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;
        const userExists = await userModel.exists({ email: email })

        if (userExists) {
            return res.json({
                status: false,
                message: 'user already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        if (!user) {

            return res.json({
                status: false,
                message: 'register failed...'
            })

        }

        res.json({
            status: true,
            message: 'registered...'
        })

    } catch (error) {
        console.log('Error registering', error);
        return res.json({
            status: false,
            message: error.message
        })
    }
}

// user login api endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await userModel.findOne({
            email: email
        })

        if (!userExist) {
            return res.json({
                status: false,
                message: 'invalid email or password...'
            })
        }
        const comparePassword = await bcrypt.compare(password, userExist.password);
        if (!comparePassword) {
            return res.json({
                status: false,
                message: 'invalid email or password...'
            })
        }

        const userToken = await jwt.sign({ userId: userExist._id }, jwt_secret);
        res.cookie('userToken', userToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({
            status: true,
            message: 'successfully login...',
            userToken
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}

// fetch users api endpoint
const fetchUsers = async (req, res) => {
    try {

        const users = await userModel.find();
        if (users.length == []) {
            return res.json({
                status: false,
                message: 'users model empty...'
            })
        }

        res.json({
            status: true,
            users
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}

// fetch user api endpoint
const fetchUser = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.userId});
        if (!user) {
            return res.json({
                status: false,
                message: 'Not found...'
            })
        }

        return res.json({
            status: true,
            user
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}

// delete user api endpoint
const deleteUser = async (req, res) => {
    try {
        const existUser = await userModel.findById({ _id: req.params.id })
        if (!existUser) {
            return res.json({
                status: false,
                message: 'Not found...'
            })
        }
        const user = await userModel.deleteOne({ _id: req.params.id });
        if (!user) {
            return res.json({
                status: false,
                message: 'delete failed...'
            })
        }

        res.json({
            status: true,
            message: 'successfull deleted...'
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}

// update user api endpoint
const updateUser = async (req, res) => {
    try {

        const { username, email } = req.body;
        const existUser = await userModel.findById({ _id: req.params.id })
        if (!existUser) {
            return res.json({
                status: false,
                message: 'Not found...'
            })
        }
        const user = await userModel.updateOne({ _id: req.params.id }, {
            $set: {
                username: username,
                email: email
            }
        });
        if (!user) {
            return res.json({
                status: false,
                message: 'update failed...'
            })
        }

        res.json({
            status: true,
            message: 'successfull updated...'
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}




module.exports = {
    registerUser,
    loginUser,
    fetchUser,
    fetchUsers,
    deleteUser,
    updateUser
}