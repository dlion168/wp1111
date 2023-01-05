import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const WaterSchema = new Schema({
    date: Date,
    time: String,
    capacity: Number
});

const Water = mongoose.model('Water', WaterSchema);
export default Water;