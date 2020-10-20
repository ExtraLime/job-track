const mongoose = require('mongoose');


const JobSchema = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    files: {
        type: Array,
        required: false
    },
    links: {
        type: Array,
        required: false
    },
    closeDate: {
        type: Date,
        required: false,
        default: "OPEN"
    }    
})
module.exports = mongoose.model('job', JobSchema);