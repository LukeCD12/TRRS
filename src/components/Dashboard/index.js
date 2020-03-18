import React, {useState, useEffect } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
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

function Dashboard(props) {
    const [score, setScore] = useState(0)
    const [userName, setUserName] = useState('')
    const [photoSrc, setPhotoSrc] = useState('')

    useEffect(() => {
        firebase.getCurrentUserScore().then(setScore)
    }, [])

    useEffect(() => {
        firebase.getCurrentUsername().then(setUserName)
    }, [])

    useEffect(() => {
        firebase.getCurrentPhoto().then(setPhotoSrc)
    }, [])

    const { classes } = props

    return (
        <div>
            <NavBar />
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Avatar alt="Profile Photo" src={photoSrc ? `${photoSrc}` : ''} className={classes.profile} />
                    <Typography align="center" component="h1" variant="h5">
                        Hello, { userName ? `${userName}`
                            :
                        <CircularProgress size={20} />}
                    </Typography>
                    <Typography component="h1" variant="h5">
                        Your score: {score ? `${score}` 
                            : 
                        <CircularProgress size={20} />}
                    </Typography>
                    <Button
                        align="center"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/update-profile"
                        className={classes.submit}>
                        Update Profile
                    </Button>
                </Paper>
            </main>
        </div>
    )
}

export default withRouter(withStyles(styles)(Dashboard))