const mongoose = require('./connection');

const {Schema, model} = mongoose;

const userSchema = new Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    email: {type: String, require: true, unique: true}
});

const User = model('user', userSchema);

module.exports = User;