import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const SleepSchema = new Schema({
    date: Date,
    hours: Number
});

const Sleep = mongoose.model('Sleep', SleepSchema);
export default Sleep;