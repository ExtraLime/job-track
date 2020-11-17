const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: "owner"
    },
    connections: {
        type: Array,
        required: true,
        default: []
    },
    username: {
        type:String,
        required:false,
    },
    userAvatar:{
        type: String,
        required: true,
        default:'public/avatars/noavatar.png'
    },
    phone:{
        type: String,
        require:false
    }
});

module.exports = mongoose.model('user', UserSchema);