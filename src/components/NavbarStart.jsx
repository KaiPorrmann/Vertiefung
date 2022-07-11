import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  ButtonGroup,
  Hidden,
  Typography,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import logo from "../assets/images/jpg.png";
import Home from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
  icons: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function Navbar() {
  const { classes } = useStyles();

  return (
    <nav>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <img src={logo} width="100" alt="logo" />
          <Typography color="secondary" className={classes.title}>
            BETA
          </Typography>

          <Hidden only="xs">
            <ButtonGroup variant="text" color="inherit">
              <Button component={Link} to="/hilfe">
                Hilfe
              </Button>
            </ButtonGroup>
          </Hidden>
          <ButtonGroup variant="text" color="inherit">
            <Button component={Link} to="/anmelden">
              ANMELDEN
            </Button>

            <Button component={Link} to="/home">
              <Home color="secondary" />
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </nav>
  );
}
