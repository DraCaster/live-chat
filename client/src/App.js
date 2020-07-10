import React, { Component } from "react";
import io from "socket.io-client";
import 'fontsource-roboto';

import Header from './components/Header'
import ChatBox from './components/ChatBox'
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core'

const socket = io.connect("http://localhost:5000");

class App extends Component {

  constructor() {
    super();
    this.state = { msg: "", chat: [], nickname: "" };
  }

  componentDidMount() {
    socket.on("chat message", ({ nickname, msg }) => {
      // Add new messages to existing messages in "chat"
      this.setState({
        chat: [...this.state.chat, { nickname, msg }]
      });
    });
  }

  // Function for getting text input
  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Function for sending message to chat server
  onMessageSubmit = () => {
    const { nickname, msg } = this.state;
    socket.emit("chat message", { nickname, msg });
    this.setState({ msg: "" });
  };

  render() {
    return (
      <div style={{backgroundColor: '#a3b03e' , height: '100vh'}}>
        <Grid container
          direction="row"
          justify="space-evenly"
          alignItems="center">
          <Grid item xs={12}>
            <Header title="Bienvenidos al chat en vivo de Lushan \(^_^)/" />
          </Grid>
          <Grid xs={12} sm={6}>
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
                  <TextField id="nickname" label="Tu apodo" variant="outlined" name="nickname" value={this.state.nickname} onChange={e => this.onTextChange(e)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="msg" label="Tu mensaje" variant="outlined" name="msg" value={this.state.msg} onChange={e => this.onTextChange(e)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" color="secondary" onClick={this.onMessageSubmit}>
                    Enviar mensaje
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid xs={12} sm={6}>
            <ChatBox chat={this.state.chat}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
