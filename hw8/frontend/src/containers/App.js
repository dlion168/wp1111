import { useEffect } from 'react';
import styled from "styled-components";
import SignIn from './SignIn';
import ChatRoom from './ChatRoom';
import { useChat } from './hooks/useChat'
import React from "react";
import "./App.css"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`
;
const App = () => {
  const { status, me, signedIn, displayStatus } = useChat()
  useEffect(() => {displayStatus(status)}, [status, displayStatus])
  return (
    <Wrapper> {signedIn? <ChatRoom />: <SignIn me={me}/>} </Wrapper>
    )
}

export default App
