import React, { useState } from 'react'
import { Typography, Paper, Button, FormControl, Input, InputLabel, Slider, Modal, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { withStyles } from '@material-ui/core/styles'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'
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
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
})

function Alerter(props) {
    return <Alert elevation={6} variant="filled" {...props} />;
}

function getModalStyle() {
    return {
        margin: 'auto',
        width: '40%',
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    };
}

function valuetext(value) {
    return `${value}`;
}

function Match(props) {

    const [abc1, setABC1] = useState('')
    const [abc2, setABC2] = useState('')
    const [value, setValue] = useState(0)
    const [open, setOpen] = useState(false)
    const [submitOpen, setSubmitOpen] = useState(false)
    const [numMatches, setNumMatches] = useState(5)
    const [modalStyle] = useState(getModalStyle)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmitClick = () => {
        handleClose()
        setSubmitOpen(true);
    };
    
      const handleSubmitClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSubmitOpen(false);
    };

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    }

    const abcRegex = new RegExp('^[a-z]{3}[0-9]{3}$')
    const { classes } = props
    const disabled = (!abcRegex.test(abc1)) || (!abcRegex.test(abc2)) || (abc1 === abc2) || !(value > numMatches / 2) || (value < 0)

    return (
        <div>
            <NavBar />
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Typography align="center" component="h1" variant="h5">
                        Submit a match
                    </Typography>
                    <form className={classes.form} onSubmit={(e) => e.preventDefault() && false}>
                        <Typography align="left" component="h6" variant="h6">
                            abc123 of <u>WINNER</u>
                        </Typography>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="abc1">abc123 winner</InputLabel>
                            <Input id="abc1" name="abc1" autoComplete="off" autoFocus value={abc1} onChange={e => setABC1(e.target.value)} />
                        </FormControl>
                        <Typography align="left" component="h6" variant="h6">
                            abc123 of <u>LOSER</u>
                        </Typography>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="abc2">abc123 loser</InputLabel>
                            <Input id="abc2" name="abc2" autoComplete="off" autoFocus value={abc2} onChange={e => setABC2(e.target.value)} />
                        </FormControl>
                        <Typography align="left" component="h6" variant="h6">
                            Number of games played
                        </Typography>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="numMatches">Matches Played</InputLabel>
                            <Input id="numMatches" name="numMatches" type="select" autoComplete="off" autoFocus value={numMatches} onChange={e => setNumMatches(e.target.value)} />
                        </FormControl>
                        <Typography align="left" component="h6" variant="h6">
                            Matches Won By <u>Winner</u> (0 - {numMatches})
                        </Typography>
                        <Slider
                            defaultValue={0}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            value={value}
                            onChange={handleSliderChange}
                            min={0}
                            max={numMatches}
                        />
                        <Typography color="error" align="center" component="h6" variant="h6">
                            <b>*make sure that all information is correct <u>BEFORE</u> submitting</b>
                        </Typography>
                        <Typography align="center" component="h6" variant="h6">
                            <b>{!disabled ? `${abc1} won ${value}/${numMatches} games against ${abc2}`: null}</b>
                        </Typography>
                        <Button
                            disabled={disabled}
                            align="center"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={handleOpen}>
                            Submit
                        </Button>
                    </form>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={open}
                        onClose={handleClose}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2 id="simple-modal-title">Are you sure all info is correct?</h2>
                            <p id="simple-modal-description">
                            <Button
                                disabled={disabled}
                                align="center"
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleClose}>
                                No
                            </Button>
                            <Button
                                disabled={disabled}
                                align="center"
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                onClick={handleSubmitClick}>
                                Yes
                            </Button>
                            </p>
                        </div>
                    </Modal>
                    <Snackbar open={submitOpen} autoHideDuration={6000} onClose={handleSubmitClose}>
                        <Alerter onClose={handleSubmitClose} severity="success">
                            Match Stats Submitted
                        </Alerter>
                    </Snackbar>
                </Paper>
            </main>
        </div>
    )
}

export default withRouter(withStyles(styles)(Match))