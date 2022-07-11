import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles } from "tss-react/mui";
import Container from "@mui/material/Container";
import fehler404 from "../assets/images/F404.png";

const useStyles = makeStyles()((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 16,
    maxWidth: "300",
  },
}));

export default function NFScreen() {
  const { classes } = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />

      <div className={classes.paper}>
        <img src={fehler404} width="800" alt="Fehler 404" />
      </div>
    </Container>
  );
}
