import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";
import Container from "@mui/material/Container";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";
import { Alert } from "@mui/material";
import { doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";

const useStyles = makeStyles()((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UpdateEmail() {
  const { classes } = useStyles();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userinfo, setUserinfo] = useState("");

  const auth = getAuth();
  var user = auth.currentUser;
  const db = getFirestore();
  const userid = user.uid;
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

  const updateData = async () => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    reauthenticateWithCredential(user, credential)
      .then(() => {
        updateEmail(auth.currentUser, newEmail)
          .then(() => {
            updateEmail();
            setMessage("Email has been updated");
            setLoading(false);
          })
          .catch((error) => {
            setError("Email failed to update");
          });
      })
      .catch((error) => {
        setError("please check your password");
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    updateData();
  }

  const updateEmail = async () => {
    await updateDoc(refuser, {
      email: newEmail,
    });
  };

  const getNewEmail = (e) => {
    setNewEmail(e.target.value);
  };
  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update email
        </Typography>
        {error && (
          <Alert className={classes.alert} severity="error">
            {error}
          </Alert>
        )}
        {message && (
          <Alert className={classes.alert} severity="success">
            {message}
          </Alert>
        )}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2} rowSpacing={1}>
            <Grid item xs={12} my={1}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email"
                name="email"
                defaultValue={userinfo.email}
              />
            </Grid>
            <Grid item xs={12} my={1}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="password"
                onChange={getPassword}
              />
            </Grid>
            <Grid item xs={12} my={1}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="newemail"
                label="New Email"
                name="newemail"
                type="email"
                autoComplete="email"
                onChange={getNewEmail}
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
      </div>
    </Container>
  );
}
