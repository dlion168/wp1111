import mongoose from 'mongoose'
import crypto from 'crypto'

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    accountId: String,
    pwd: String,
    salt: String
});

// Method to set salt and hash the password for a user 
UserSchema.methods.setPassword = function (password) {
    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations, 
    this.pwd = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not 
UserSchema.methods.validPassword = function (password) {
    var pwd = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.pwd === pwd;
};

const User = mongoose.model('User', UserSchema);
export default User;