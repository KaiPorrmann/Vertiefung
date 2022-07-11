import React from "react";
import { makeStyles } from "tss-react/mui";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import FeedbackIcon from "@mui/icons-material/Feedback";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PeopleIcon from "@mui/icons-material/People";
import DiamondIcon from "@mui/icons-material/Diamond";
import EditIcon from "@mui/icons-material/Edit";

const drawerWidth = 240;

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 1,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: "65px",
    [theme.breakpoints.down("sm")]: {
      width: 60,
      flexShrink: 1,
    },
  },
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  buttons: {
    width: drawerWidth,
  },
}));

const MenuBar = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div />
        <Divider />
        <List>
          <ListItem
            button
            className={classes.buttons}
            component={Link}
            to="/app/forum"
          >
            <ListItemIcon>
              <AccountBalanceWalletIcon style={{ color: "#F5BC32" }} />
            </ListItemIcon>
            <ListItemText primary={"Forums"} />
          </ListItem>
          <ListItem
            button
            className={classes.buttons}
            component={Link}
            to="/app/fragen"
          >
            <ListItemIcon>
              <FeedbackIcon style={{ color: "#8CBC11" }} />
            </ListItemIcon>
            <ListItemText primary={"Feedback"} />
          </ListItem>
          <ListItem
            button
            className={classes.buttons}
            component={Link}
            to="/app/social"
          >
            <ListItemIcon>
              <EditIcon style={{ color: "#F17040" }} />
            </ListItemIcon>
            <ListItemText primary={"Social"} />
          </ListItem>

          <ListItem
            button
            className={classes.buttons}
            component={Link}
            to="/app/chat"
          >
            <ListItemIcon>
              <PeopleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={"Chat"} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
export default MenuBar;
