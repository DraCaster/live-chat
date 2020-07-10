import React from 'react'
import { ListItemText, List, Paper, Grid, ListItemIcon, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TodayIcon from '@material-ui/icons/Today';
import moment from 'moment'

export const useStyles = makeStyles(theme => ({
  date: {
    color: '#d49100',
  },
  nickname: {
    color: '#44ad07'
  }
}));

const ChatBox = (props) => {
  const { chat } = props
  const classes = useStyles()
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Paper>
        <Grid item xs={12}>
          <List>
            <ListItem>
              <ListItemIcon children={<TodayIcon />} />
              <ListItemText
                className={classes.date}
                primary={moment().format('ll')}
                primaryTypographyProps={{ variant: 'subtitle2' }} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12}>
          <List>
            { chat.map(({ nickname, msg }, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={`• ${nickname}  dice:`}
                  className={classes.nickname}
                  secondary={`${msg}`}
                  secondaryTypographyProps={{ variant: 'subtitle2' }}>
                </ListItemText>
              </ListItem>
            ))
            }
          </List>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default ChatBox
