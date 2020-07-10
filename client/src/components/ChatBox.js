import React from 'react'

const ChatBox = (props) => {

    const {chat} = props
    return chat.map(({ nickname, msg }, idx) => (
        <div key={idx}>
          <span style={{ color: "green" }}>{nickname}: </span>
  
          <span>{msg}</span>
        </div>
      ));
}

export default ChatBox
