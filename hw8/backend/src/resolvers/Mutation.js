import {v4 as uuidv4} from 'uuid';
import { MessageModel } from '../models/chatbox';
const checkOutChatBox = async (name1, name2, ChatBoxModel)=>{
  const makeName = [name1, name2].sort().join('_')
  let box = await ChatBoxModel.findOne({ name: makeName });
  if (!box)
    box = await new ChatBoxModel({ name: makeName, messages: [] }).save();
  return box;
}

const Mutation = {
  createChatBox: async(parent, { name1, name2 }, {ChatBoxModel} ) => {
    let box = await checkOutChatBox(name1, name2, ChatBoxModel)
    return await box.populate('messages');
  },
  createMessage: async (parent, { name, to, body }, { ChatBoxModel, pubsub } )=> {
    let chatBox = await checkOutChatBox(name, to, ChatBoxModel);
    const newMsg = { sender: name, body: body };
    const message = new MessageModel(newMsg)
    try { await message.save(); } 
    catch (e) { throw new Error("Message DB save error: " + e); }
    chatBox.messages.push(message._id);
    await chatBox.save(); 
    const chatBoxName = [name, to].sort().join('_');
    pubsub.publish(`chatBox ${chatBoxName}`, {message: newMsg,});
    return newMsg;
 },  
};

export default Mutation;