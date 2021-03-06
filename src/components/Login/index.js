import React, { useState }from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../firebase'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(6))]: {
            width: 400,
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
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        marginTop: theme.spacing(3),
    },
    bad: {
        color: 'red'
    }
})

function Login(props) {
    const { classes } = props
    const abcRegex = new RegExp('^[a-z]{3}[0-9]{3}$')
    const utsaEmail = '@my.utsa.edu'

    var [bad, setBad] = useState(false)
    var [abc, setABC] = useState('')
    const [password, setPassword] = useState('')

    const disabled = (abc === '') || (password === '') || (!abcRegex.test(abc))

    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">abc123</InputLabel>
                        <Input id="abc" name="abc" autoComplete="off" autoFocus value={abc} onChange={e => setABC(e.target.value)} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input type="password" name="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
                    </FormControl>
                    {bad ? <Typography color="error" component="h6" variant="h6">
                        *Error Invalid abc123/password
                    </Typography>
                        : 
                    null}
                    <Button
                        disabled={disabled}
                        align="center"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={login}
                        className={classes.submit}>
                        Sign in
                    </Button>
                    <Button
                        align="center"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/register"
                        className={classes.submit}>
                        New Member? Register Here
                    </Button>
                    <Button
                        align="center"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/"
                        className={classes.submit}>
                        Cancel
                    </Button>
                </form>
            </Paper>
        </main>
    )

    async function login() {
        try {
            abc = abc + "" + utsaEmail
            await firebase.login(abc, password)
            firebase.getFirstTime().then(res => {
                res 
                ? props.history.push('/update-profile')
                : props.history.push('/dashboard')
                
            })
        }
        catch(e) {
            console.error(e)
            setBad(true)
        }
    }

}

export default withRouter(withStyles(styles)(Login))