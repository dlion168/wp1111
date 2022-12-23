import { useState, createContext, useContext, useEffect } from "react";
import { message } from 'antd';

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    sendMessage: () => {},
    startChat: ()=>{},
   });

const client = new WebSocket('wss://wp1111-hw9-backend-production-4e1e.up.railway.app/')

const ChatProvider = (props) => {
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "")
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        console.log("Responded payload: ", payload)
        switch (task) {
            // case "init": {
            //     setMessages(payload); break;}
            case "OUTPUT": {
                console.log("[useChat] Respond received:", payload)
                setMessages(() =>[...messages, payload]); break; }
            case "CHATSTART": {
                setMessages(payload.messages);
                break;}
            case "STATUS": {
                displayStatus(payload);
                break;}
            // case "clear": {
            //     setMessages([]); break;}
            default: break;
        }
    }
    // const clearMessages = ()=>{
    //     sendData({
    //         type: 'CLEAR',
    //         payload: {}
    //     });
    // };
    const sendMessage = (name, to, body) => {
        if (!name || !to || !body){
            throw new Error('Name or to or body required !')
        }
        sendData({
            type: 'MESSAGE',
            payload: {name, to, body}
        });
        console.log("[useChat] Message sent:", name, to, body)
    };
    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };
    
    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = {content: msg, duration: 0.5 };
            switch (type) {
                case 'success':
                    message.success(content);
                    break;
                case 'error':
                default:
                    message.error(content);
                    break;
        }}}
    
    const startChat = (name, to)=>{
        if (!name || !to){
            throw new Error('Name or to required !')
        }
        sendData({
            type: 'CHAT',
            payload: {name, to}
        })
    }
    useEffect(() => {
            if (signedIn) {
                localStorage.setItem(LOCALSTORAGE_KEY, me);
            }
        }, [me, signedIn]);

    return (
            <ChatContext.Provider
            value={{
                status, me, signedIn, messages, setMe, setSignedIn,
                sendMessage, displayStatus, startChat
            }}
            {...props}
            />
        );
};

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
