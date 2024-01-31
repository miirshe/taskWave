const express = require('express');
const { userAuthenticate } = require('../middleware/userAuthenticate');
const { registerUser, loginUser, updateUser, deleteUser, fetchUser, fetchUsers } = require('../controllers/userController');
const userRoutes = express.Router();
userRoutes.post('/user/register', registerUser)
userRoutes.post('/user/login', loginUser)
userRoutes.put('/user/:id', userAuthenticate, updateUser)
userRoutes.delete('/user/:id',userAuthenticate, deleteUser)
userRoutes.get('/users', fetchUsers)
userRoutes.get('/user/current', userAuthenticate, fetchUser)
// userRoutes.post('/user/changePassword', userAuthentication, userChangePassword)
module.exports = userRoutes;