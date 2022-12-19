import styled from "styled-components";
import { Tag } from 'antd'
const StyledMessage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${({isMe})=>(isMe ? "row-reverse":"row")};
    margin: 8px 0px;
    & p:first-child{
        margin: 0px 5px;
    }
    & p:last-child{
        padding: 2px 5px;
        border-radius: 5px;
        background: #eee;
        color: gray;
        margin: auto 0;
    }
`;
const Message = ({ name, isMe, message, className}) => {
    return (
    <StyledMessage isMe={isMe} className={className}>
        <p><Tag color="blue">{name}</Tag> {message}</p>
    </StyledMessage>
    );
   };
export default Message;