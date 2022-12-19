import { useState, useEffect, useRef } from 'react';
import { useChat } from './hooks/useChat.js'
import styled from 'styled-components'
import { Input, Tabs } from 'antd'
import Title from '../components/Title'
import Message from '../components/Message'
import ChatModal from '../components/chatModal' 

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    borderRadius: 10px;
    margin: 20px;
    padding: 20px;
`
const ChatBoxWrapper = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`

const FootRef = styled.div`
    height: 20px;
`

const ChatRoom = () => {
  const { me, messages, setMessages, sendMessage, displayStatus, startChat, setFriend, friend, getChatBoxQuery} = useChat()
  const [ msg, setMsg ] = useState('')
  const [ chatBoxes, setChatBoxes ] = useState([])
  const [ activeKey, setActiveKey ] = useState('')
  const [ modalOpen, setModalOpen ] = useState(false);
  const msgRef = useRef(null)
  const msgFooter = useRef(null)
  
  const renderChat = (chat) => {
    return(
      <ChatBoxWrapper>
      {chat.length === 0 ? (
        <p style={{color : '#ccc'}}> No messages ...</p>
      ) : (
      [...chat.map(({sender, body}, i) =>{ return(
        <Message name={sender} isMe = {sender === me} message={body} key={i}></Message>)
          }
        ), <FootRef key={chat.length} ref={msgFooter}/>]
      )}
      </ChatBoxWrapper>
    )
  }; // 產⽣ chat 的 DOM nodes
  const extractChat = (friend) => {
    return renderChat(messages.filter(({name, body}) => ((name === friend) || (name === me))));
    }
  
  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView
    ({ behavior: 'smooth', block: "start" });
    };

  const createChatBox = (friend) => {
    if (chatBoxes.some(({key}) => key === friend)) {
      throw new Error(friend +"'s chat box has already opened.");
    }
    const chat = extractChat(friend);
    const makeKey = [me, friend].sort().join('_')
    setChatBoxes([...chatBoxes, { label: friend, children: chat, key: makeKey}]);
    return makeKey;
    };
  const removeChatBox =(targetKey, activeKey) => {
     const index = chatBoxes.findIndex((e) => e.label === activeKey);
     const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
     setChatBoxes(newChatBoxes);
     return activeKey? activeKey === targetKey? index === 0?
     '' : chatBoxes[index - 1].key : activeKey : '';
    };

  useEffect(() => {
    const index = chatBoxes.findIndex(p => p.key === activeKey);
    if (index > -1){
      let box = [...chatBoxes]
      box[index].children = renderChat(messages)
      setChatBoxes(box)}
  }, [messages]
  )

  useEffect(()=>{
    scrollToBottom();},
    [chatBoxes])
  
  return (
    <>
      <Title name={me}></Title>
      <ChatBoxesWrapper
        items={chatBoxes}
        tabBarStyle = {{ height: '36px' }}
        type = 'editable-card'
        activeKey = {activeKey} 
        onChange={(key) => {
          setActiveKey(key);
          var index = chatBoxes.findIndex(p => p.key === key);
          startChat({
            variables: { name1: me, name2: chatBoxes[index].label},
            onCompleted: (data) => setMessages(data.createChatBox.messages)
          });
          setFriend(chatBoxes[index].label);
          }}
        onEdit={(targetKey, action) => {
          if (action === 'add') setModalOpen(true);
          else if (action === 'remove') {
            setActiveKey(removeChatBox(targetKey, activeKey));
            }}}
      >
      </ChatBoxesWrapper>
      <ChatModal
        open={modalOpen}
        onCreate={({ name }) => {
          setActiveKey(createChatBox(name));
          startChat({
            variables: { name1: me, name2: name },
            onCompleted: (data) => {
              setMessages(data.createChatBox.messages);
            }
          });
          setFriend(name);
          setModalOpen(false);
          displayStatus({
            type: 'success',
            msg: 'New chatbox opened'
          })
        }}
        onCancel={() => { setModalOpen(false);}}
      />
      <Input.Search
        ref={msgRef}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a message body.'
            })
            return
          }
          var index = chatBoxes.findIndex((e) => e.key === activeKey);
          if (index === -1){
            displayStatus({
              type: 'error',
              msg: 'Please open a chat first.'
            })
            return
          }
          sendMessage({
            variables: { name: me, to: friend, body: msg },
          })
          
          setMsg('')
          }
        }
      ></Input.Search>
    </>
  )
}
export default ChatRoom