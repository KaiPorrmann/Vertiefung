import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "tss-react/mui";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogActions from "@mui/material/DialogActions";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";
import Color from "color";
import {
  Card,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Grid,
  CardContent,
  DialogContentText,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
  setDoc
} from "firebase/firestore";
import {Link} from "react-router-dom";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
    },
    gridList: {
      flexWrap: "wrap",
      //Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
      width: 1350,
      height: 700,
    },
    card: {
      margin: 10,
      minHeight: 415,
    },
    title: {
      fontSize: 14,
      minHeight: 40,
      display: "flex",
      fontWeight: "bold",
      lineHeight: '24px',
      margin: '16px 0px'
    },
    subtitle: {
      minHeight: 90,
    },
    cardMedia: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "350px",
      height: "200px",
    },
    gridContainer: {},

    cardAngebot: ({ color }) => ({
      minWidth: 256,
      borderRadius: 16,
      boxShadow: "none",
      "&:hover": {
        boxShadow: `0 6px 12px 0 ${Color(color)
          .rotate(-12)
          .darken(0.2)
          .fade(0.5)}`,
      },
    }),
  };
});

const DialogContent = withStyles(MuiDialogContent, (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const DialogActions = withStyles(MuiDialogActions, (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}));

export default function Angebote() {
  const { classes } = useStyles();
  const [reward, setReward] = useState([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [points, setPoints] = useState("");
  const [wallet_index, setWallet_index] = useState("");
  const [donation, setDonation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [admin, setAdmin] = useState(false);
  const [wallet_address, setWallet_address] = useState("");
  const [title, setTitle] = useState("");

  const auth = getAuth();
  const db = getFirestore();
  const userCurrentauth = auth.currentUser;
  const userID = userCurrentauth.uid; 

  const refuser = doc(db, "users", userID);
  const rewardsRef = collection(db, "rewards");

  //Firestore 9
  const addUserInfo = () => {
    onSnapshot(refuser, (doc) => {
      setUser(doc.data());
      setWallet_index(doc.data().wallet_index);
      setWallet_address(doc.data().wallet_address);
    });
  };
  useEffect(() => {
    addUserInfo();
  }, []);

  const getRewardList = async () => {
    const q = query(
      rewardsRef,
      where("active", "==", "1")
    );
    const querySnapshot = await getDocs(q);
    const itemss = [];
    querySnapshot.forEach((doc) => {
      itemss.push(doc.data());
    });
    setReward(itemss);
  };

  useEffect(() => {

    getRewardList();
    
    return () => {};
  }, [user]);


  return (
    <>

      {reward.length === 0 ? (
        <></>
      ) : (
        <>
          <Grid
            container
            className={classes.root}
            justifyContent="center"
            alignItems="center"
          >
            <ImageList
              className={classes.gridList}
              cellHeight={450}
              cols={3}
              justify="center"
              alignItems="stretch"
            >
              {reward.map((r) => (
                <ImageListItem key={r.id}>
                  <Card className={classes.card}>
                    <CardMedia className={classes.cardMedia}>
                      <img src={r.url} width="350" height="200" alt="Bild" />
                    </CardMedia>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        gutterBottom
                        variant="h4"
                        component="h1"
                        sx={{textDecoration: 'underline'}} display="inline"
                      >
                        {r.title}
                      </Typography>
                      <Typography
                        className={classes.subtitle}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {r.subtitle}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                      >
                        Link
                      </Button>
                    </CardActions>
                  </Card>
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </>
      )}
    </>
  );
}
