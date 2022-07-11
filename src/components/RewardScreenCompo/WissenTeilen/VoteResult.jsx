import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Table,
  TableCell,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  TableBody,
  ListItemAvatar,
} from "@material-ui/core";
//import { firestore } from "../../backend/firebase"
import { v4 as uuidv4 } from "uuid";
//import ThumbUpIcon from "@material-ui/icons/ThumbUp";
//import ThumbDownIcon from "@material-ui/icons/ThumbDown";
//import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import { useAuth } from "../../../backend/AuthContext";
import Link from "@material-ui/core/Link";
import { Button } from "@material-ui/core";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const useStyles = makeStyles(() => ({
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
  }));

export default function VoteResults() {

const classes = useStyles();
const [tips, setTips] = useState([]);
const [allReco, setAllReco] = useState([]);
//const { currentUser } = useAuth();
//const userID = currentUser.uid;
const auth = getAuth();
const db = getFirestore();

const userCurrentauth = auth.currentUser;
const userID = userCurrentauth.uid;

const refReco = collection(db, "recommendation");

//const ref = firestore.collection("recommendation");

//REALTIME GET FUNCTION
const getTips = async () => {
  const q = query(
    refReco,
    //where("id", "==", user.companyid),
    where("active", "==", "1")
  );
  const querySnapshot = await getDocs(q);
  const itemss = [];
  querySnapshot.forEach((doc) => {
    itemss.push(doc.data());
  });
  setTips(itemss);
};
//function getTips() {
  //ref.onSnapshot((querySnapshot) => {
    //const items = [];
    //querySnapshot.forEach((doc) => {
      //items.push(doc.data());
    //});
    //setAllReco(items);
    /*  only save in the array if the user has not voted yet  */
    //var newArray = [];
    //items.map((items) => {
      //const index = items.users.indexOf(userID);
      //if (index === -1) {
        //newArray = [...newArray, items];
      //}
      //return index;
    //});
    //setTips(newArray);
  //});
//
//}
useEffect(() => {
  getTips();
  // eslint-disable-next-line
}, []);

return (
    <Container component="main" maxWidth="sm">
      <Grid container spacing={4} justify="center" className={classes.title}>
       

        {/* results of voting on all recommendations */}

        <Typography component="h5" variant="h5">
          Voting results
        </Typography>

        {/*  list all of recommendation */}

        <Grid xs={12} item>
          <Paper className={classes.list}>
            {
            tips
            .sort((a, b) => a.likes < b.likes ? 1 : -1)
            .map((items) => (
              //tips.map((items) => (
              <List key={uuidv4()}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="h2">
                        {items.title}
                      </Typography>
                    }
                  />

                  <Typography variant="h6">{items.likes}</Typography>
                  <Typography className={classes.divider} variant="h6">
                    {"--"}
                  </Typography>
                  <ListItemAvatar>
                    {/*<ThumbUpIcon color="primary" />*/}
                  </ListItemAvatar>
                  <Typography variant="h6">{items.neutral}</Typography>
                  <Typography className={classes.divider} variant="h6">
                    {"--"}
                  </Typography>
                  <ListItemAvatar>
                    {/*<CompareArrowsIcon color="primary" />*/}
                  </ListItemAvatar>
                  <Typography variant="h6">{items.dislikes}</Typography>
                  <Typography className={classes.divider} variant="h6">
                    {"--"}
                  </Typography>
                  <ListItemAvatar>
                    {/*<ThumbDownIcon color="primary" />*/}
                  </ListItemAvatar>
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
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                    className={classes.p}
                  >
                    <Link href={items.link} target="_blank">
                      {items.link}
                    </Link>
                  </Typography>
                </ListItem>
                {items.fileURL === "" ? (
                  <></>
                ) : (
                  <ListItem>
                    <img src={items.fileURL} width="100" alt="PDF / File" />
                    <Button
                      component={Link}
                      href={items.fileURL}
                      target="_blank"
                      variant="text"
                      color="secondary"
                      size="large"
                    >
                      show attachment
                    </Button>
                  </ListItem>
                )}

                <Divider />
              </List>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}