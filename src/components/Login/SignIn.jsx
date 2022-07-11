import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../backend/firebase";



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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



export default function SignIn() {

  const { classes } = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();

  //Ufuk 
  const [data, setData] = useState({
    emailUf: "",
    password: "",
    errorUf: null,
    loadingUf: false,
});
  const { emailUf, password, errorUf, loadingUf} = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
};

  async function handleSubmit(e) {
    e.preventDefault();
  const result = await signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
    navigate("/app/wallet");
     //Ufuk
     await updateDoc(doc(db, "users", result.user.uid), {
      isOnline: true,
    })
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setError("");
        setLoading(true);
        // history.replace("app/wallet");
      })
      .catch((error) => {
        setError("Fehler beim Anmelden: ", error.message);
      });
  }

  /* async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/app/wallet");
      /* console.log(remember); 
    } catch {
      setError("Fehler beim Anmelden");
    }
    setLoading(false);
  } */

  /*  function handleRemenber(e) {
    setRemember(e.target.checked);
  } */

  return (
    <Container component="main" maxWidth="xs" color="primary">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Einloggen
          <br></br>
        </Typography>

        {error && (
          <Alert className={classes.submit} severity="error">
            {error}
          </Alert>
        )}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Addresse"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef}
            onChange={handleChange} //Ufuk
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Passwort"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordRef}
            onChange={handleChange} //Ufuk
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Einloggdaten merken"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Einloggen
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/passwort-vergessen" variant="body2">
                Passwort vergessen?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/registrieren" variant="body2">
                {"Kein Benutzerkonto? Registrieren"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
