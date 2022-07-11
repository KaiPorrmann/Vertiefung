import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";

const useStyles = makeStyles()((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//sending data only if a title and text has been written
export default function Learning() {
  const { classes } = useStyles();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  //const [user, setUser] = useState("");
  const [update, setUpdate] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  const auth = getAuth();
 // const database = getFirestore();
  const db = getFirestore();
  
  const userCurrentauth = auth.currentUser;
  const userID = userCurrentauth.uid; 
  const refReco = collection(db, "learning");

  //Firestore 8 -> 9
  //const ref = firestore.collection("learning");

  async function addLearning() {
    const newID = uuidv4();
    const newDoc = {
      text,
      title,
      firstname: user.firstname,
      surname: user.surname,
      id: newID,
      //Firestore 8 -> 9
      //useremail: currentUser.email,
    };
    if (text === "" || title === "") {
      setError("Please enter title and text");
    } else {
      //Firestore 8 -> 9
      await setDoc(doc(refReco, newID), newDoc);
      setUpdate("Thanks for your input");
    }
  }

  const getText = (e) => {
    setText(e.target.value);
  };

  const getTitle = (e) => {
    setTitle(e.target.value);
  };

  //const getUser = (e) => {
  //  setUser(e.target.value);
  //};

  useEffect(() => {
    userFetch();
    // eslint-disable-next-line
  }, []);

  async function userFetch() {

    const refUserdata = doc(db, "users", userID);
    const refuser = await getDoc(refUserdata);
    if(refuser.exists){
    setUser(refuser.data())
    }
    else{
      console.log("No such document!")
    }
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Learning
        </Typography>

        {/* error message  */}
        {error && (
          <Alert className={classes.submit} severity="error">
            {error}
          </Alert>
        )}

        {/* message sent successfully  */}
        {update && (
          <Alert className={classes.submit} severity="success">
            {update}
          </Alert>
        )}
        <form className={classes.form} noValidate>
          {/*<TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="user"
            label="User"
            name="User"
            autoComplete="User"
            autoFocus
            onChange={getUser}
        />*/}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="Title"
            label="Headline"
            minHeight="200"
            id="title"
            onChange={getTitle}
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
            onChange={getText}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            onClick={addLearning}
            type="reset"
          >
            SEND
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
    </Container>
  );
}
