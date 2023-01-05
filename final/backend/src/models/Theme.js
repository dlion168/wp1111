import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ThemeSchema = new Schema({
    theme: String,
    topic: [{
        pic: String,
        title: String
    }]
});

const Theme = mongoose.model('Theme', ThemeSchema);
export default Theme;