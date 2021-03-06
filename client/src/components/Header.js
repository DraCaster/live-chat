import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Typography} from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    paper: {
      backgroundColor:'#f2cd66',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(5),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Header = (props) => {
    const classes = useStyles()
    return (<Paper className={classes.paper}>
        <Typography variant="h4">{props.title}</Typography>
    </Paper>
    )
}

export default Header;