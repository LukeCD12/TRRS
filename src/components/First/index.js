import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/AccountBox'
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
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        marginTop: theme.spacing(3),
    }
})

function First(props) {
    const [imageFile, setImageFile] = useState('')

    const disabled = (imageFile === '')

    const handleImageAsFile = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            setImageFile(image)
        }
    }

    const { classes } = props

    const isFirst = firebase.firstTime()

    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Update Profile Photo
                </Typography>
                <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="upload">Upload Image</InputLabel>
                        <Input type="file" id="profile" name="profile" autoFocus fullWidth onChange={handleImageAsFile} accept="image/*" />
                    </FormControl>
                    <Button
                        align="center"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/dashboard"
                        className={classes.submit}>
                        {isFirst
                        ? 'Skip'
                        : 'Cancel'}
                    </Button>
                    <Button
                        disabled={disabled}
                        align="center"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={updatePhoto}
                        className={classes.submit}>
                        Save
                    </Button>
                    
                </form>
            </Paper>
        </main>
    )

    async function updatePhoto() {
        try {
            await firebase.updateCurrUserProfile(imageFile)
            props.history.push('/dashboard')
        }
        catch(e) {
            alert(e.message)
        }
    }

}

export default withRouter(withStyles(styles)(First))