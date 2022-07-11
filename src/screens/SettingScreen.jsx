import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { makeStyles } from "tss-react/mui";
import set from "../assets/images/setting-icon.png";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UpdateNames from "../components/Settings/UpdateNames";
import UpdateAvatar from "../components/Settings/UpdateAvatar";
import UpdatePasswort from "../components/Settings/UpdatePasswort";
import UpdateEmail from "../components/Settings/UpdateEmail";

const useStyles = makeStyles()((theme) => ({
  icon: {
    color: "#ffffff",
    height: 30,
    width: 30,
  },
  settindIcon: {
    alignItems: "center",
    width: "100px",
  },
}));

function SettingScreen() {
  const { classes } = useStyles();

  const [config, setConfig] = useState("user");

  const handleClick = (item) => {
    setConfig(item);
  };

  return (
    <Fragment>
      <Grid
        container
        sx={{
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} mt={5} mb={7}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 1,
              mx: 4,
            }}
          >
            <Grid item m={2}>
              <img className={classes.settindIcon} src={set} alt="icon"></img>
            </Grid>
            <Grid item m={2}>
              <Typography variant="h3" component="h3" sx={{ color: "#898989" }}>
                Settings
              </Typography>
            </Grid>
          </Box>
        </Grid>

        <Grid item>
          <List className={classes.list}>
            <ListItem>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  handleClick("user");
                }}
              >
                <ListItemIcon>
                  <PersonIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={"User settings"} />
              </Button>
            </ListItem>

            <ListItem>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  handleClick("pass");
                }}
              >
                <ListItemIcon>
                  <VpnKeyIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={"Password settings"} />
              </Button>
            </ListItem>

            <ListItem>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  handleClick("email");
                }}
              >
                <ListItemIcon>
                  <AlternateEmailIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={"Email settings"} />
              </Button>
            </ListItem>

            <ListItem>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  handleClick("avatar");
                }}
              >
                <ListItemIcon>
                  <AccountCircleIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={"Avatar settings"} />
              </Button>
            </ListItem>
          </List>
        </Grid>
        {config === "user" && (
          <Grid xs={6} item>
            <UpdateNames />
          </Grid>
        )}
        {config === "pass" && (
          <Grid xs={6} item>
            <UpdatePasswort />
          </Grid>
        )}
        {config === "email" && (
          <Grid xs={6} item>
            <UpdateEmail />
          </Grid>
        )}
        {config === "avatar" && (
          <Grid xs={6} item>
            <UpdateAvatar />
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
}

export default SettingScreen;
