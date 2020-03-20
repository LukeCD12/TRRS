import React, { useState, useEffect } from 'react'
import { Typography, Paper, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import firebase from '../firebase'
import { withRouter, Link } from 'react-router-dom'
import NavBar from '../NavBar'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(6))]: {
            width: '60%',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
        backgroundColor: 'white',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        marginTop: theme.spacing(3),
    },
    profile: {
        margin: theme.spacing(1),
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
})

function Match(props) {
 
    const { classes } = props

    return (
        <div>
            <NavBar />
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Typography align="center" component="h1" variant="h5">
                        Start a match
                    </Typography>
                    <form>

                    </form>
                </Paper>
            </main>
        </div>
    )
}

export default withRouter(withStyles(styles)(Match))