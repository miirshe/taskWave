const mongoose = require('mongoose');

exports.connectDB = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/taskWaveDB',{
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then( () => {
        console.log('connection established');
    }).catch(err => console.log(err));
}