import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, FormControl, InputLabel, Input, Button } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import Nav from '../NavBar'
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
    submit: {
        marginTop: theme.spacing(3),
    },
    profile: {
        margin: theme.spacing(1),
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    root: {
        padding: '3%',
        margin: 'auto',
        width: '75%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(30)
    },
})

function Help(props) {

    const [feedback, setFeedback] = useState('')

    const { classes } = props
    return (
        <div>
            <Nav />
            <Typography color="textSecondary" align="center" component="h1" variant="h1" noWrap>
                Help
            </Typography>
            <div className={classes.root}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>My Score is wrong!?!!!</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Give the server an hour to update your score.
                            (Please dont spam refresh, as there are a limited number of reads to the database per day)
                            if after an hour your score has not updated or is still incorrect talk to an officer and it will be resolved ASAP.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>How Do I...</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            ...check rankings?: Click on "Club Rankings" above.<br /><br />
                            ...check my profile?: Click on your name/profile image and then click "profile".<br /><br />
                            ...logout?: Click on your name/profile image and then click "logout".<br /><br />
                            ...get help?: You are already on the page for help! If this is not good enough, talk to an officer.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Feedback / Issue Report</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
                                <FormControl required fullWidth>
                                    <InputLabel htmlFor="feedback">Feedback</InputLabel>
                                    <Input id="feedback" name="feedback" autoFocus onChange={setFeedback} value={feedback} fullWidth />
                                </FormControl>
                                <Button
                                    align="center"
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={() => {messageToFirebase()}}>
                                    Submit
                                </Button>
                        </form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </div>
    )

    function messageToFirebase() {
        firebase.uploadFeedback(feedback)
    }
}

export default withStyles(styles)(Help)