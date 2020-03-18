import React, { useState, useEffect } from 'react'
import './styles.css'

import Home from '../Home'
import Login from '../Login'
import Register from '../Register'
import Dashboard from '../Dashboard'
import firebase from '../firebase'
import First from '../First'
import Rankings from '../Rankings'
import Help from '../Help'
import Admin from '../Admin'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0C2340',
        },
        secondary: {
            main: '#F15A22',
        },
        text: {
            secondary: "white",
            error: "#5c0512" //red
        }
    }
})

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        firebase.isLoggedIn()
        ? firebase.isUserAdmin()
        ? <Component {...props} />
        : <Redirect to='/dashboard' />
        : <Redirect to='/login' />
    )}
    />
)

const MemberRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        firebase.isLoggedIn() === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )}
    />
)

function App() {
    const [firebaseInitialized, setFirebaseInitialized] = useState(false)

    useEffect(() => {
        firebase.isInitialized().then(isInit => {
            setFirebaseInitialized(isInit)
        })
    })

    return firebaseInitialized !== false ? (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <MemberRoute exact path="/dashboard" component={Dashboard} />
                        <MemberRoute exact path="/update-profile" component={First} />
                        <MemberRoute exact path="/rankings" component={Rankings} />
                        <MemberRoute exact path="/help" component={Help} />
                        <AdminRoute exact path="/admin" component={Admin} />
                        <Redirect to="/" />
                    </Switch>
                </Router>
        </MuiThemeProvider>
    )
        :
    <div id="loader">
        <CircularProgress />
    </div>

    
}

export default App