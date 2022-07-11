import React from "react";
import { makeStyles } from "tss-react/mui";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
/* import Badge from "@mui/material/Badge"; */
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import logo from "../../assets/images/jpg.png";
import AccountCircle from "@mui/icons-material/AccountCircle";
/* import NotificationsIcon from "@mui/icons-material/Notifications"; */
import MoreIcon from "@mui/icons-material/MoreVert";

import { getAuth, signOut } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { Avatar, Typography } from "@mui/material";

const useStyles = makeStyles()((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  Icon: {
    width: "30px",
    height: "30px",
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function NavBarLogIn() {
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userinfo, setUserinfo] = useState("");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const auth = getAuth();
  const db = getFirestore();
  var userr = auth.currentUser;
  const userid = userr.uid;
  const refuser = doc(db, "users", userid);

  //Firestore 9
  const addUserInfo = () => {
    onSnapshot(refuser, (doc) => {
      setUserinfo(doc.data());
    });
  };
  useEffect(() => {
    addUserInfo();
    // eslint-disable-next-line
  }, []);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  //const [error, setError] = useState("");
  //Firestore 8
  //const { logout } = useAuth();
  /* async function handleLogout() {
    
    setError("");
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to reset password");
      console.log(error);
    }
  } */

  //Firestore 9
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        //setError("");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        component={Link}
        to="/app/konto-verwalten"
        onClick={handleMenuClose}
      >
        {" "}
        Manage account
      </MenuItem>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/*      <MenuItem component={Link} to="/app/notification">
        <IconButton aria-label="show 0 new notifications" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          size="large"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/app/wallet">
            <img src={logo} width="100" alt="Logo" />
          </Link>
          <div className={classes.grow}>
            <Typography className={classes.title}>BETA</Typography>
          </div>
          <div className={classes.sectionDesktop}>
            {/*<IconButton
              component={Link}
              to="/app/notification"
              aria-label="show 0 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon className={classes.Icon} />
              </Badge>
            </IconButton>*/}
            <Button
              //edge="end"
              //aria-label="account of current user"
              //aria-controls={menuId}
              //aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              //color="inherit"
            >
              <Avatar alt="Avatar" src={userinfo.fileURL} />
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              size="large"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
