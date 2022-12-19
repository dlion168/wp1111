const Query = {
  chatbox: async (parent, { name1, name2 }, { ChatBoxModel }) => {
    const makeName = [name1, name2].sort().join('_')
    let box = await ChatBoxModel.findOne({ name: makeName });
    if (!box)
      box = await new ChatBoxModel({ name: makeName, messages: [] }).save();
    return await box.populate('messages');
  },
 };

export default Query;
 