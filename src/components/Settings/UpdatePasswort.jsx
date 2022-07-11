import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { Link } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  alert: {
    margin: theme.spacing(3, 0, 2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UpdatePasswort() {
  const { classes } = useStyles();

  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  //Firestore 8 -> 9
  //const { updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const auth = getAuth();
  var user = auth.currentUser;

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value === "") {
      return setError("You have not typed anything");
    }
    if (passwordRef.current.value.length < 6) {
      return setError(" It must be at least 6 characters");
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords don't match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    //Firestore 8 -> 9
    /* if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
 */
    Promise.all(promises)
      .then(() => {
        updateData();
      })
      .catch(() => {
        setError("Password not changed");
      });
  }

  const updateData = async () => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            setMessage("Password changed successfully");
            setLoading(false);
            console.log("Done");
          })
          .catch((error) => {
            setError("Email failed to update");
          });
      })
      .catch((error) => {
        setError("please check your password");
      });
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };
  const getNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5">
        Change password
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {message && <Alert severity="success">{message}</Alert>}

      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="oldPW"
              label="Current password"
              height="200"
              id="oldPW"
              type="password"
              autoComplete="current-password"
              onChange={getPassword}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="newPW"
              label="Enter new password"
              height="200"
              id="newPW"
              type="password"
              autoComplete="current-password"
              inputRef={passwordRef}
              onChange={getNewPassword}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="newPwconfirm"
              label="Confirm new password"
              height="200"
              id="newPwconfirm"
              type="password"
              autoComplete="current-password"
              inputRef={passwordConfirmRef}
              //onChange={getNewPassword}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          className={classes.submit}
          disabled={loading}
        >
          UPDATE
        </Button>
      </form>
    </Container>
  );
}
