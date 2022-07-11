import React from "react";
import ChatScreen from "../screens/ChatScreen";
import TextField from "@mui/material/TextField";
import { FormControl, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { makeStyles } from "tss-react/mui";
import { ImageList, ImageListItem } from "@mui/material";

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
    marginTop: "480px",
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

export default function Chat() {
  const { classes } = useStyles();

  return (
    <div>
      <ChatScreen />
      <div>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          //anchor="left"
        >
          <FormControl fullWidth sx={{ m: 1, width: "28ch" }}>
            <TextField
              id="outlined-basic"
              label={"Search for Users"}
              variant="outlined"
              autoComplete="firstname"
            />
          </FormControl>
        </Drawer>
        <Typography>Hier wird der Chat sein</Typography>
      </div>
    </div>
  );
}
