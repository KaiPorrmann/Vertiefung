import React, { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";
import Container from "@mui/material/Container";
import { Alert, Avatar } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

export default function UpdateAvatar() {
  const { classes } = useStyles();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [fileURL, setfileURL] = useState("");
  const [noFile, setNoFile] = useState(true);
  const [userinfo, setUserinfo] = useState("");

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const storageRef = ref(storage, "Users");
  var userr = auth.currentUser;
  const userid = userr.uid;
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

  //Firestore 8 -> 9
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    //const fileRef = storageRef.child(file.name);
    const fileRef = ref(storageRef, file.name);
    //await fileRef.put(file);
    uploadBytes(fileRef, file).then((snapshot) => {
      console.log("Upload file!");
      setNoFile(false);
      getDownloadURL(fileRef)
        .then((url) => {
          setfileURL(url);
        })
        .catch((error) => {
          setError("Failed", error);
        });
    });
    //setfileURL(await fileRef.getDownloadURL());
  };

  const updateUserAvatar = async () => {
    await updateDoc(refuser, {
      fileURL,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      updateUserAvatar();
      setMessage("Avatar has been updated");
    } catch {
      setError("Failed");
    }
    //refreshPage()
  }

  return (
    <Container component="main" maxWidth="xs">
      <Grid item className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update avatar
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
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {fileURL ? (
              <Grid item>
                <Avatar
                  alt="Avatar"
                  src={fileURL}
                  sx={{ width: 120, height: 120 }}
                />
              </Grid>
            ) : (
              <Grid item>
                <Avatar
                  alt="Avatar"
                  src={userinfo.fileURL}
                  sx={{ width: 120, height: 120 }}
                />
              </Grid>
            )}

            <Grid item>
              <input type="file" onChange={onFileChange} />
            </Grid>
          </Grid>

          <Grid container marginTop={2}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              size="large"
              type="submit"
              disabled={noFile}
            >
              Upload Avatar
            </Button>
          </Grid>
          <Grid container marginTop={2}></Grid>
        </form>
      </Grid>
    </Container>
  );
}
