import mongoose from 'mongoose';
const Schema = mongoose.Schema
// Creating a schema, sort of like working with an ORM
/******* Message Schema *******/
const MessageSchema = new Schema({
   sender: { type: String },
   body: { type: String, required: [true, 'Body field is required.'] },
  });
const MessageModel = mongoose.model('Message', MessageSchema);
  /******* ChatBox Schema *******/
const ChatBoxSchema = new Schema({
   name: { type: String, required: [true, 'Name field is required.'] },
   messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
  });
const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);
// Creating a table within database with the defined schema

// Exporting table for querying and mutating
export { MessageModel, ChatBoxModel };