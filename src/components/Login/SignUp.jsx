import React, { useRef, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  AVATAR_URL,
} from "../../api/config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  collection,
  getDoc,
  getDocs,
  updateDoc, Timestamp,
} from "firebase/firestore";

import { db, auth } from "../../backend/firebase";

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const { classes } = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordconfirmRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [surname, setSurname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [indexWallet, setIndexWallet] = useState("");
  const [companyid, setCompanyID] = useState("");
  const [companies, setCompanies] = useState([]);

  //Ufuk
  const auth = getAuth();
  const db = getFirestore();


  async function getArraycompanies() {
    const querySnapshot = await getDocs(collection(db, "Companies"));
    const array = [12345];
    querySnapshot.forEach((doc) => {
      array.push(doc.data());
    });
    setCompanies(array);
  }

  useEffect(() => {
    getArraycompanies();
    // eslint-disable-next-line
  }, []);

  const addUser = async (uid) => {
    const userdoc = {
      email,
      firstname,
      surname,
      fileURL: AVATAR_URL,
      id: uid,
      companyid: companyid,
      createdAt: Timestamp.fromDate(new Date()),
      isOnline: true,
    };
    await setDoc(doc(db, "users", uid), userdoc)
      .then(() => {
        navigate("/app/forum");
      })
      .catch((e) => {
        console.error(e);
        setError("Fehler beim Senden der Daten");
      });
  };

  const getFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const getSurname = (e) => {
    setSurname(e.target.value);
  };

  const getEmail = (e) => {
    setEmail(e.target.value);
  };

  const getCompanyID = (e) => {
    setCompanyID(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if(!surname && !firstname) {
      return setError("Füllen Sie Vor- und Nachnamen ein");
    }else if (surname.length < 3 && firstname.length < 3)
    return setError("Ihr Name sollte mind. 3 Zeichen enthalten");
    if (passwordRef.current.value !== passwordconfirmRef.current.value) {
      return setError("Passwörter stimmen nicht überein");
    }
    if(!email) {
      return setError("Die E-Mail-Adresse fehlt");
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return setError("Keine gültige E-Mail-Adresse");
    }
    if(!passwordRef) {
      return setError("Das Password fehlt");
    } else if (passwordRef.length < 6) {
      return setError("Das Passwort muss mind. 6 Zeichen haben");
    }
    if(!companyid) {
      return setError("Trage deine Company-ID ein!")
    }
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;
        addUser(uid);
      })
      .catch((error) => {
        setError("Account Erstellung Fehlgeschlagen");
      });

    setLoading(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrieren
        </Typography>
        {error && (
          <Alert className={classes.submit} severity="error">
            {error}
          </Alert>
        )}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Vorname"
                autoFocus
                onChange={getFirstname}
                // onChange={handleChange} //Ufuk
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Nachname"
                name="lastName"
                autoComplete="lname"
                onChange={getSurname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                type="email"
                label="E-Mail Adresse"
                name="email"
                autoComplete="email"
                inputRef={emailRef}
                onChange={getEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Passwort"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordconf"
                label="Passwort bestätigen"
                type="password"
                id="passwordconf"
                autoComplete="current-password"
                inputRef={passwordconfirmRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="sport"
                label="Sport Code"
                type="sportid"
                id="sportid"
                autoComplete="sportid"
                onChange={getCompanyID}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            registrieren
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/anmelden" variant="body2">
                Haben Sie schon ein Konto? Anmelden
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
