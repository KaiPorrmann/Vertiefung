import React, { useState, useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import {
  Button,
  Typography,
  Grid,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
  getDoc,
  updateDoc,
  setDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
      borderRadius: 16,
    },
    list: {
      borderRadius: 16,
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      display: "flex",
      minWidth: 360,
    },
    title: {
      marginTop: 15,
    },
    p: {
      minWidth: 520,
    },
    cardTitle: {
      width: "70%",
    },
    divider: {
      color: "#ffffff",
    },
  };
});

export default function LearningList() {
  const { classes } = useStyles();
  //const [items, setItems] = useState([]);
  const [tips, setTips] = useState([]);

  const auth = getAuth();
  const db = getFirestore();

  const userCurrentauth = auth.currentUser;
  const userID = userCurrentauth.uid;

  const refReco = collection(db, "learning");


  //Firestore 8 -> 9
  // const ref = firestore.collection("learning");
  //REALTIME GET FUNCTION
  async function getItems() {
    const q = query(
      refReco,
      //where('users', 'not-in', userID)
      //where(userID, 'not-in', "users")
      //where("active", "==", "1")
    );
    const querySnapshot = await getDocs(q);
    const itemss = [];
    //const users = [];
    querySnapshot.forEach((doc) => {
      itemss.push(doc.data());
      //users.push(doc.data().users)
    });
    setTips(itemss);
  }

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        className={classes.title}
      >
        <Typography component="h5" variant="h5">
          List
        </Typography>

        <Grid item xs={12}>
          <Paper className={classes.list}>
            {tips.map((items) => (
              <List key={uuidv4()}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="h4">
                        {items.title}
                      </Typography>
                    }
                  />
                </ListItem>

                <ListItem>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                    className={classes.p}
                  >
                    {items.text}
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="h8" component="h5">
                        {"von:  " + items.firstname + " " +  items.surname}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </List>
            ))}
          </Paper>
        </Grid>

        <div>
          <Button
            component={Link}
            to="/app/wallet"
            variant="text"
            size="large"
            color="secondary"
          >
            back
          </Button>
        </div>
      </Grid>
    </Container>
  );
}
