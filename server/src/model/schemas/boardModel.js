const mongoose = require('mongoose');
const boardSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userModel'
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        default : ''
    },
    color : {
        type : String,
        required : true,
        default : '#1366B9'
    },
    createdAt : {
        type : Date,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () =>  Date.now()
    }
})

exports.boardModel = mongoose.model('boardModel',boardSchema);