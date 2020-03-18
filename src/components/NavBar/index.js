import React, { useState, useEffect} from 'react';
import { AppBar, Toolbar, IconButton, Typography, MenuItem, Menu, Avatar, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Assessment, ExitToApp, SupervisorAccount, HelpOutline, AccountCircle } from '@material-ui/icons'
import firebase from '../firebase';
import { withRouter, Link } from 'react-router-dom'
import Mobile from '../MobileDrawer'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mobileTitle: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    position: 'relative',
    margin: "auto",
    marginRight: theme.spacing(25),
    marginLeft: 0,
  }
}));

function PrimarySearchAppBar(props) {
  const [photoSrc, setPhotoSrc] = useState('')
  const [userName, setUserName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    firebase.getCurrentUsername().then(setUserName)
  }, [])

  useEffect(() => {
    firebase.getCurrentPhoto().then(setPhotoSrc)
  }, [])

  useEffect(() => {
    firebase.isUserAdmin().then(setIsAdmin)
  }, [])

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/dashboard"><AccountCircle />{'\u00A0'}Profile</MenuItem>
      <MenuItem component={Link} to="/help"><HelpOutline />{'\u00A0'}Help</MenuItem>
      <MenuItem onClick={logout}><ExitToApp />{'\u00A0'}Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to="/dashboard">
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar alt="Profile Photo" src={photoSrc ? `${photoSrc}` : ''} className={classes.profile} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem component={Link} to="/rankings">
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Assessment />
        </IconButton>
        <p>Rankings</p>
      </MenuItem>
      <MenuItem onClick={logout}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToApp />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          
          <Typography className={classes.title} variant="h6" noWrap>
            Table Runners Ranking System
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          { isAdmin ? 
          <IconButton
            edge="end"
            aria-label="admin menu"
            aria-controls={menuId}
            aria-haspopup="true"
            component={Link}
            to="/admin"
            color="inherit"
          >
            Admin Menu{'\u00A0'}
            <SupervisorAccount />
          </IconButton>
            :
          null}
          <IconButton
              edge="end"
              aria-label="rankings"
              aria-controls={menuId}
              aria-haspopup="true"
              component={Link}
              to="/rankings"
              color="inherit"
            >
              Club Rankings{'\u00A0'}
              <Assessment />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              { userName ? `${userName}`
                :
              <CircularProgress size={20} />}
              {'\u00A0'}
              <Avatar alt="Profile Photo" src={photoSrc ? `${photoSrc}` : ''} className={classes.profile} />
            </IconButton>
          </div>
          {'\u00A0'}
          <div className={classes.sectionMobile}>
            <Typography className={classes.mobileTitle} variant="h6" noWrap>
              TRRS          
            </Typography>
            <Mobile />
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      
    </div>
  );

  async function logout() {
    await firebase.logout()
    props.history.push('/')
  }

  

}

export default withRouter(PrimarySearchAppBar)