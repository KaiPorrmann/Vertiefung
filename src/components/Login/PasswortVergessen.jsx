import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { Alert } from "@mui/material";

import Divider from "@mui/material/Divider";

const useStyles = makeStyles()((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgotPassword() {
  const { classes } = useStyles();
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  //const user = auth.currentUser;
  //const userid = user.uid;

  async function handleSubmit(e) {
    e.preventDefault();
    await sendPasswordResetEmail(
      auth,
      emailRef.current.value,
    )
      .then(() => {
        setLoading(true);
        setMessage("Check your inbox for further instructions");
        setError("");
        //history.push("/app/wallet");
      })
      .catch((error) => {
        setError("Failed to reset password", error.message);
      });
  }

  return (
    <>
      <Container component="main" maxWidth="xs" color="primary">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Passwort Vergessen
            <br></br>
            <br></br>
          </Typography>
          <Typography component="h6" variant="body2">
            Bitte geben Sie Ihre E-mail Adresse ein.
            <br></br>
            Sie erhalten dann einen Link zum Erstellen eines neuen Passworts per
            E-Mail
          </Typography>

          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Addresse"
              name="email"
              autoFocus
              inputRef={emailRef}
              type="email"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              Passwort zurücksetzen
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </form>
        </div>
        <Divider style={{ background: "black" }} variant="middle" />
        <br></br>
        <Link to="/anmelden" style={{ textDecoration: "none" }} variant="body1">
          Erinnern Sie sich wieder an Ihr Passwort ? Anmelden
        </Link>
      </Container>
    </>
  );
}
