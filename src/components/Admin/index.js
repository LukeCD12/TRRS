import React from 'react'
import { Typography, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Nav from '../NavBar'
import { withRouter } from 'react-router-dom'
import firebase from '../firebase'

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

function Admin(props) {

    const { classes } = props

    return (
        <div>
            <Nav />
            {firebase.isUserAdmin() ? 
                <div>
                    <Typography color="textSecondary" align="center" component="h1" variant="h1" noWrap>
                        Admin
                    </Typography>
                    <main className={classes.main}>
                        <Paper className={classes.paper}>
                            <Typography align="center" component="h1" variant="h5">
                                As of right now all admin controls are on Google Firebase<br />
                                <a href="https://firebase.google.com">firebase.google.com</a><br />
                            </Typography>
                            <Typography align="left" component="h1" variant="h5">
                                {/*login info:<br />
                                {'\t'}Email: trrssystem.noreply@Gmail.com<br />
                                {'\t'}Password: trrsadmin*/}
                            </Typography>
                        </Paper>
                    </main>
                </div>
                :
            redirectNonAdmins()}
        </div>
    )
    
    function redirectNonAdmins() {
        props.history.goBack();
    }
}

export default withRouter(withStyles(styles)(Admin))