import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getFirestore, collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import Header from "../components/Feedback/HeaderF"

const useStyles = makeStyles()((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Feedback() {
  const { classes } = useStyles();

  const [inhalt, setInhalt] = useState("");
  const [titel, setTitel] = useState("");
  const [update, setUpdate] = useState("");
  const [error, setError] = useState("");
  const [reason, setReason] = useState("");

  const db = getFirestore();

  const refReco = collection(db, "feedback");

  async function addFeedback() {
    const newID = uuidv4();
    const newDoc = {
      text: inhalt,
      title: titel,
      reason: reason,
      id: newID,
      createdAt: Timestamp.fromDate(new Date()),
      //Firestore 8 -> 9
      //useremail: currentUser.email,
    };
    if (inhalt === "" || titel === "") {
      setError("Please enter title and text");
    } else {
      //Firestore 8 -> 9
      await setDoc(doc(refReco, newID), newDoc);
      setUpdate("Thanks for your input");
    }
  }
  const getInhalt = (e) => {
    setInhalt(e.target.value);
  };

  const getTitel = (e) => {
    setTitel(e.target.value);
  };
  const getReason = (e) => {
    setReason(e.target.value);
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
      <Grid item xs={12}>
        <Header></Header>
        </Grid>
        {error && (
          <Alert className={classes.submit} severity="error">
            {error}
          </Alert>
        )}
        {update && (
          <Alert className={classes.submit} severity="success">
            {update}
          </Alert>
        )}
          
        <form className={classes.form} noValidate>
          
          <select value = {reason} onChange={getReason}>
            <option value = "Feedback">Feedback geben</option>
            <option value = "Frage an Support">Frage an den Support</option>
            <option value = "Fehler melden">Fehler melden</option>
          </select>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Ueberschrift"
            label="Headline"
            minHeight="200"
            id="ueberschrift"
            autoComplete="current-password"
            onChange={getTitel}
          />

          <TextField
            multiline={true}
            rows={4}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Text"
            label="Text"
            id="Text"
            onChange={getInhalt}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            onClick={addFeedback}
            type="reset"
          >
            send
          </Button>
          <Grid container>
            <Button
              component={Link}
              to="/app/reward"
              variant="text"
              size="large"
              color="secondary"
              fullWidth
            >
              back
            </Button>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
