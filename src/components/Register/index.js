import React, { useState } from 'react'
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
    }
})

function Register(props) {
    const { classes } = props
    const abcRegex = new RegExp('^[a-z]{3}[0-9]{3}$')
    const utsaEmail = '@my.utsa.edu'

    const [name, setName] = useState('')
    var [abc, setABC] = useState('')
    const [abcConfirm, setABCConfirm] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const disabled = (password === '') || (name === '') || (password !== passwordConfirm) || (!abcRegex.test(abc.toLowerCase())) || (abc.toLowerCase() !== abcConfirm.toLowerCase())

    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register Account
                </Typography>
                <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
                    Full Name
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Name</InputLabel>
                        <Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)} />
                    </FormControl>
                    abc123
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="normal">abc123</InputLabel>
                        <Input id="abc123" name="abc123" autoComplete="off" value={abc} onChange={e => setABC(e.target.value)} />
                    </FormControl>
                    Confirm abc123
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="normal">Confirm abc123</InputLabel>
                        <Input id="abc123Confirm" name="abc123Confirm" autoComplete="off" value={abcConfirm} onChange={e => setABCConfirm(e.target.value)} />
                    </FormControl>
                    Password
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="passsword">Password</InputLabel>
                        <Input type="password" id="password" name="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
                    </FormControl>
                    Confirm Password
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="passsword">Confirm Password</InputLabel>
                        <Input type="password" id="passwordConfirm" name="passwordConfirm" autoComplete="off" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                    </FormControl>
                    <Button
                        disabled={disabled}
                        align="center"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={onRegister}
                        className={classes.submit}>
                        Register
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

    async function onRegister() {
        try {
            const email = abc.toLowerCase() + "" + utsaEmail
            await firebase.register(name, email, password, abc.toLowerCase())
            props.history.replace('/login')
            alert('Account created please login')
        }
        catch(e) {
            alert(e.message)
        }
    }
}

export default withRouter(withStyles(styles)(Register))