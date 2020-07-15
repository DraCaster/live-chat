import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import 'fontsource-roboto'; 

import Header from './components/Header'
import ChatBox from './components/ChatBox'
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core'

const socket = io.connect("http://localhost:5000");

const App = () => {

  const [chat, setChat] = useState([])
  const [nickname, setNickname] = useState('')
  const [msg, setMsg] = useState('')
  const [getMessages, setGetMessages] = useState(true)

  useEffect(() => {
    if(getMessages){
      fetchMessages();
    }
  },[chat, nickname,msg])

  
  const fetchMessages = () => {
    socket.on("chat message", ({ nickname, msg }) => {

      // Add new messages to existing messages in "chat"
      setChat([...chat, {nickname,msg}])
     
    });
    setGetMessages(false)
  }
 
  // Function for getting text input
  const onTextChange = e => {
    if(e.target.name === 'nickname'){
      setNickname(e.target.value)
    }else{
      setMsg(e.target.value)
    }
  };

  // Function for sending message to chat server
  const onMessageSubmit = () => {
    socket.emit("chat message", { nickname, msg });
    setGetMessages(true)
    setMsg('');
  };

    return (
      <div style={{backgroundColor: '#a3b03e' , height: '100vh'}}>
        <Grid container
          direction="row"
          justify="space-evenly"
          alignItems="center">
          <Grid item xs={12}>
            <Header title="Bienvenidos al chat en vivo de Lushan \(^_^)/" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Grid
                container
                spacing={2}
                direction="column"
                justify="space-around"
                alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Comenza a chatear!</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="nickname" label="Tu apodo" variant="outlined" name="nickname" value={nickname} onChange={e => onTextChange(e)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="msg" label="Tu mensaje" variant="outlined" name="msg" value={msg} onChange={e => onTextChange(e)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" color="secondary" onClick={onMessageSubmit}>
                    Enviar mensaje
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid xs={12} sm={6} item>
            <ChatBox chat={chat}/>
          </Grid>
        </Grid>
      </div>
    );
  }


export default App;
