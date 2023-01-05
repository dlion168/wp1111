import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ChecklistPerWeekSchema = new Schema({
  week: Number,
  intro: String, 
  title: String,
  data: [{ type: mongoose.Types.ObjectId, ref: 'ChecklistItem' }]
});

const ChecklistPerWeek = mongoose.model('ChecklistPerWeek', ChecklistPerWeekSchema);
export default ChecklistPerWeek;