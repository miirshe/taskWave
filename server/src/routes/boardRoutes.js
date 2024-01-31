const express = require('express');
const { userAuthenticate } = require('../middleware/userAuthenticate');
const { createBoard, getUserBoards, updateBoard, deleteBoard } = require('../controllers/boardController');

const boardRoutes = express.Router();
boardRoutes.post('/board/create', userAuthenticate , createBoard);
boardRoutes.get('/boards', userAuthenticate ,getUserBoards)
boardRoutes.put('/board/:id', userAuthenticate , updateBoard);
boardRoutes.delete('/board/:id', userAuthenticate , deleteBoard);
module.exports = boardRoutes;