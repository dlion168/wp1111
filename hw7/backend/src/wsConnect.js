import { ChatBoxModel, MessageModel } from './models/chatBox'
const sendData = (data, ws) => {ws.send(JSON.stringify(data)); }
const sendStatus = (payload, ws) => {sendData(["STATUS", payload], ws); }
const makeName = (name, to) => {return [name, to].sort().join('_')}
const validateChatBox = async (name, participant) => {
    let box = await ChatBoxModel.findOne({ name:name });
    if (!box) box = await new ChatBoxModel({ name: name, user: participant, messages: []}).save();
    return box.populate(["messages"]);
   };
// 在 global scope 將 chatBoxes 宣告成空物件
const chatBoxes = {};
export default {
    onMessage: (ws) => (
        async (byteString) => {
            const { data } = byteString
            const { type, payload } = JSON.parse(data)
            switch (type) {
                case 'MESSAGE':{
                    const { name, to, body } = payload;
                    const chatBoxName = makeName(name, to)
                    ws.box = chatBoxName
                    // 如果不曾有過 chatBoxName 的對話，將 chatBoxes[chatBoxName] 設定為 empty Set
                    if (!chatBoxes[chatBoxName]) chatBoxes[chatBoxName] = new Set(); // make new record for chatbox
                    // 將 ws client 加入 chatBoxes[chatBoxName]
                    chatBoxes[chatBoxName].add(ws); // add this open connection into c

                    let box = await ChatBoxModel.findOne({ name: chatBoxName });
                    const message = new MessageModel({ sender:name, body:body })
                    try { await message.save(); } 
                    catch (e) { throw new Error("Message DB save error: " + e); }
                    //Respond to client
                    box.messages.push(message._id)
                    try { await ChatBoxModel.findOneAndUpdate({ name: chatBoxName }, box)}
                    catch (e) { throw new Error("Message DB update error: " + e); }
                    chatBoxes[chatBoxName].forEach(element => {
                        sendData(['OUTPUT', message], element)
                        sendStatus({
                            type: 'success',
                            msg: 'Message sent.'
                        }, element)
                    })
                    break;
                }
                case 'CHAT':{
                    const { name, to } = payload;
                    const key = makeName(name, to)
                    let messages = await validateChatBox(key, name)
                    sendData(['CHATSTART', messages], ws)
                    break;
                }
                // case 'CLEAR':{
                //     MessageModel.deleteMany({{name: }}, () => {
                //         sendData('CLEARED', ws)
                //         sendStatus
                //         ({ type: 'info', msg: 'Message cache cleared.'}, ws)
                //         })
                //     break;
                //     }
                default:{ 
                    break;}
            }
        }
    )
}   