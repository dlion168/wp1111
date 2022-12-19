import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_MESSAGE_MUTATION, CREATE_CHATBOX_MUTATION, MESSAGE_SUBSCRIPTION } from "../../graphql";
import { useState, createContext, useContext, useEffect } from "react";
import { message } from 'antd';

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    setMessages: () => {},
    setSignedIn: () => {},
    sendMessage: () => {},
    startChat: ()=>{},
    setFriend: ()=>{},
    getChatBoxQuery: ()=>{},
    friend: ""
   });

const ChatProvider = (props) => {
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "")
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);
    const [friend, setFriend] = useState('')
    const [getChatBoxQuery, { data, subscribeToMore }]= useLazyQuery(CHATBOX_QUERY, {
        variables: {
            name1: me,
            name2: friend,
        },
    });
    // const { data, subscribeToMore }= useQuery(CHATBOX_QUERY, {
    //     variables: {
    //         name1: me,
    //         name2: friend,
    //     },
    // });

    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
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
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    useEffect(() => {
            if (signedIn) {
                localStorage.setItem(LOCALSTORAGE_KEY, me);
            }
        }, [me, signedIn]);

    useEffect(() => {
        console.log("data is", data)
        try {
            let unsubscribe = subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { from: me, to: friend },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message;
                    return {
                        chatbox: {name: prev.chatbox.name, messages: [...prev.chatbox.messages, newMessage],},
                    };
                },
            });
            return () => unsubscribe()
        } catch (e) {console.log(e)} 
        }, [subscribeToMore, friend]);
    
    useEffect(()=>{
        getChatBoxQuery({
            variables:{
                name1: me,
                name2: friend,
            },
        })
        if(data){
            setMessages(data.chatbox.messages)
        }
    },[data, friend])

    return (
            <ChatContext.Provider
            value={{
                status, me, signedIn, messages, setMessages, setMe, setSignedIn,
                sendMessage, displayStatus, startChat, setFriend, friend, getChatBoxQuery,
            }}
            {...props}
            />
        );
};

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
