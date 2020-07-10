import React, { Component } from "react";
import io from "socket.io-client";
import 'fontsource-roboto';
import Header from './components/Header'
import {  TextField, Button, Grid, Paper } from '@material-ui/core'
import { useStyles } from './AppStyle'
const socket = io.connect("http://localhost:5000");

class App extends Component {
  // Add constructor to initiate
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

  renderChat() {
    const { chat } = this.state;
    return chat.map(({ nickname, msg }, idx) => (
      <div key={idx}>
        <span style={{ color: "green" }}>{nickname}: </span>

        <span>{msg}</span>
      </div>
    ));
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
    //const classes = useStyles()
    return (
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Header title="Bienvenidos al chat en vivo de Lushan \(^_^)/" />
          </Grid>
          <Grid xs={12} sm={6}>
            <Paper>
              <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                  <TextField id="nickname" label="Tu apodo" variant="outlined" name="nickname" value={this.state.nickname} onChange={e => this.onTextChange(e)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="msg" label="Tu mensaje" variant="outlined" name="msg" value={this.state.msg} onChange={e => this.onTextChange(e)} />
                </Grid>
              </Grid>


              <Button variant="contained" color="primary" onClick={this.onMessageSubmit}>
                Enviar
        </Button>
            </Paper>
          </Grid>
          <Grid xs={12} sm={6}>
            <div>{this.renderChat()}</div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
