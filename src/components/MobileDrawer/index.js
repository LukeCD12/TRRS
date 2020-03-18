import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IconButton, Avatar, Typography } from '@material-ui/core'
import { Assessment, ExitToApp, SupervisorAccount, HelpOutline } from '@material-ui/icons'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../firebase'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function TemporaryDrawer(props) {
  const [isAdmin, setisAdmin] = React.useState(false)
  const [photoSrc, setPhotoSrc] = React.useState('')
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  React.useEffect(() => {
    firebase.isUserAdmin().then(setisAdmin)
  }, [])

  React.useEffect(() => {
    firebase.getCurrentPhoto().then(setPhotoSrc)
  }, [])

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
          <ListItem>
            <Typography component="h1" variant="h4">
                TRRS
            </Typography>
          </ListItem>
        {['Profile', 'Rankings', 'Help'].map((text, index) => (
            <div key={index}>
                {getCurrIcon(text, index)}
            </div>
        ))}
      </List>
      <Divider />
      <List>
        {['Logout'].map((text, index) => (
          <ListItem onClick={logout} button key={text}>
            <ListItemIcon>
                <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      {isAdmin ?
      <List>
        {['Admin'].map((text, index) => (
          <ListItem component={Link} to="/admin" button key={text}>
            <ListItemIcon>
                <SupervisorAccount />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
        : 
      null}
    </div>
  );

  async function logout() {
    await firebase.logout()
    props.history.push('/')
  }

  function getCurrIcon(text, index) {
        switch (index) {
            case 0:
                return (
                    <ListItem button key={text} component={Link} to="/dashboard">
                        <ListItemIcon>
                            <Avatar alt="Profile Photo" src={photoSrc ? `${photoSrc}` : ''} className={classes.profile} />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                )

            case 1:
                return (
                    <ListItem button key={text} component={Link} to="/rankings">
                        <ListItemIcon>
                            <Assessment />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                )

            case 2:
                return (
                    <ListItem button key={text} component={Link} to="/help">
                        <ListItemIcon>
                            <HelpOutline />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                )
            default:
                return null
        }
  }

  return (
    <div>
        <IconButton
            aria-label="show more"
            aria-haspopup="true"
            onClick={toggleDrawer('right', true)}
            color="inherit"
        >
            <MoreVertIcon />    
        </IconButton>
      <Drawer open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}

export default withRouter(TemporaryDrawer)