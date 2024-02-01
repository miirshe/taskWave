const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./src/model/db/ConnectDB');
const userRoutes = require('./src/routes/userRoutes');
const boardRoutes = require('./src/routes/boardRoutes');
const taskRoutes = require('./src/routes/taskModel');

const PORT = 8000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', userRoutes);
app.use('/api', boardRoutes);
app.use('/api', taskRoutes);

connectDB();

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});