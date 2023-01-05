import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ChecklistItemSchema = new Schema({
  week: !Number,
  checked: Boolean, 
  text: String,
  liked: Boolean,
  date: String,
  location: String,
  repeat: String,
  Note: String
});

const ChecklistItem = mongoose.model('ChecklistItem', ChecklistItemSchema);
export default ChecklistItem;