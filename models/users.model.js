const mongoose = require('mongoose');

const collectionUser = 'users';

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    age: { type: Number },
    password: { type: String }
});

const userModel = mongoose.model(collectionUser, userSchema)
module.exports = {userModel};