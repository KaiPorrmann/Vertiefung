import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const useStyles = makeStyles()((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UpdateNames() {
  const { classes } = useStyles();

  const firstnameRef = useRef();
  const surnameRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [surname, setSurname] = useState("");
  const [firstname, setFirstname] = useState("");

  const auth = getAuth();
  const db = getFirestore();
  var userr = auth.currentUser;
  const userid = userr.uid;
  const refuser = doc(db, "users", userid);

  const updateUser = async () => {
    await updateDoc(refuser, {
      firstname: firstname,
      surname: surname,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      updateUser();
      setMessage("Names have been updated");
    } catch {
      setError("Failed");
    }

    setLoading(false);
  }
  const getFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const getSurname = (e) => {
    setSurname(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update name
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="First name"
                name="firstname"
                autoComplete="firstname"
                inputRef={firstnameRef}
                onChange={getFirstname}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="surname"
                label="Last name"
                name="surname"
                autoComplete="surname"
                inputRef={surnameRef}
                onChange={getSurname}
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
