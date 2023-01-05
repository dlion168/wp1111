import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const SymptomSchema = new Schema({
    date: Date,
    time: String,
    symptomName: String
});

const Symptom = mongoose.model('Symptom', SymptomSchema);
export default Symptom;