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
import { storage } from "../../../backend/firebase";
import { getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { set, ref } from "firebase/database";
import { useEffect } from "react";
import { Box } from "@mui/material";


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
  text: {
    margin: theme.spacing(3, 0, 2),
    color: "#707070",
  },
  input: {
    top: "10px",
    left: "8px",
    fontSize: "17px",
    color: "#b8b8b8",
    borderRadius: "5px",
  },
}));

//sending data only if a title and text has been written
export default function ShareKnowHow() {
  const { classes } = useStyles();
  //const { currentUser } = useAuth();
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [update, setUpdate] = useState("");
  const [error, setError] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileURL, setfileURL] = useState("");

  const auth = getAuth();
 // const database = getFirestore();
  const db = getFirestore();
  
  const userCurrentauth = auth.currentUser;
  const userID = userCurrentauth.uid; 

  async function userFetch() {

    const refUserdata = doc(db, "users", userID);
    const refuser = await getDoc(refUserdata);
    if(refuser.exists){
    setUserAddress(refuser.data().wallet_address)
    }
    else{
      console.log("No such document!")
    }
    }
  //Bei Problemen vergleich zug_leiden_main

  useEffect(() => {
    userFetch();
    // eslint-disable-next-line
  }, []);

  //Firestore 8 -> 9
  /* const ref = firestore.collection("recommendation");
  const refTransaction = firestore.collection("transactions"); */

  const refReco = collection(db, "recommendation");

  function getParsedDate() {
    let today = new Date();
    let date =
      today.getDate() +
      "-" +
      parseInt(today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    return date;
  }

  async function addRecommendation() {
    const newID = uuidv4();
    const reco = {
      text,
      title,
      user,
      likes: 0,
      dislikes: 0,
      neutral: 0,
      id: newID,
      users: [userID],
      //Firestore 8 -> 9
      useremail: userCurrentauth.email,
      link,
      fileURL,
      active: "1",
      date: new Date(),
      timestamp: getParsedDate(),
      timestamp_day: getParsedDate().substring(0, 2),
      timestamp_month: getParsedDate().substring(3, 5),
      timestamp_year: getParsedDate().substring(6, 10),
    };

    if (text === "" || title === "") {
      setError("Bitte Titel und Text eingeben");
    } else {
      await setDoc(doc(refReco, newID), reco)
      //const recco = collection(refReco, newID)
      //recco.set(reco)
      .then(()=> {
        setError("");
        setText("");
        setTitle("");
        setUser("");
      })
      setUpdate("Die Information wurde erfolgreich gesendet");
    }
  }

  const getText = (e) => {
    setText(e.target.value);
  };

  const getTitle = (e) => {
    setTitle(e.target.value);
  };

  const getUser = (e) => {
    setUser(e.target.value);
  };

  const getLink = (e) => {
    setLink(e.target.value);
  };

  //Firebase 9
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    uploadFiles(file);
    const uploadFiles = (file) => {
      if(!file) return;
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available", downloadURL)
        }) 
      )
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Share knowledge{" "}
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
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="ansender"
            label="Sender"
            name="Absender"
            autoComplete="Absender"
            autoFocus
            onChange={getUser}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="Ueberschrift"
            label="Headline"
            id="ueberschrift"
            onChange={getTitle}
          />
          {/* <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="Ueberschrift"
            label="Headline"
            minHeight="200"
            id="ueberschrift"
            onChange={getTitle}
          />
 */}
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
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Link"
            label="Link"
            id="link"
            onChange={getLink}
          />
          {/*  <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Link"
            label="Link"
            minHeight="200"
            id="link"
            onChange={getLink}
          /> */}
          <Box className={classes.submit}>
            <Typography color="#909090" className={classes.text}>
              Upload File
            </Typography>
            <input
              className={classes.input}
              type="file"
              onChange={onFileChange}
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            onClick={addRecommendation /*earnToken*/}
            type="reset"
            disabled={loading}
          >
            SEND
          </Button>
          <Grid container>
            <Button
              component={Link}
              to="/earn"
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

