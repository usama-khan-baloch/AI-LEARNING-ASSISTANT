import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please provide a username'],
        unique: true,
        trim: true,
        minlength: [3, 'username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'please provide an email'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: [6, 'password must be at least 6 characters long'],
        select: false
    },
    profileImage: {
        type: String,
        default: null
    },

}, { timestamps: true});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compair password method
userSchema.methods.matchPassword = async function(enterPassword) {
     return await bcrypt.compare(enterPassword, this.password);
};

const User = mongoose.model('user', userSchema);

export default User;