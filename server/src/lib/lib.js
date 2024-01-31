const dotenv = require('dotenv');
dotenv.config();
const jwt_secret = process.env.NOTE_SECRET_KEY;
module.exports = {
    jwt_secret,
}