import React, { useState, useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import TextField from "@mui/material/TextField";
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
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { getAuth } from "firebase/auth";
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
import { set, ref } from "firebase/database";
import Link from "@mui/material/Link";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";




const useStyles = makeStyles()(() => {
  return {
    root: {
      display: "flex",
      borderRadius: 16,
    },
    list: {
      borderRadius: 16,
      marginLeft: -30,
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      marginTop: 15,
      display: "flex",
      minWidth: 360,
    },
    title: {
      marginTop: 15,
      display: "flex",
      minWidth: 360,
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

export default function VoteReco() {
  const { classes } = useStyles();
  const [tips, setTips] = useState([]);
  const [allReco, setAllReco] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [userarray, setUserArray] = useState([]);
  const [user, setUser] = useState("");
  const navigate = useNavigate();



  const auth = getAuth();
  const db = getFirestore();

  const userCurrentauth = auth.currentUser;
  const userID = userCurrentauth.uid;

  const refReco = collection(db, "recommendation");

  
  const getTips = async () => {
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
      if ( !doc.data().users.includes(userID)){
      itemss.push(doc.data());
    }
      //users.push(doc.data().users)
    });
    setTips(itemss);
    //setUserArray(users);
  };

  useEffect(() => {
  getTips();
  }, []);

  //Firestore 8 -> 9
  //async function ResetRecos(id) {
    /* firestore.collection("recommendation").doc(id).update({
      active: "0",
    }); */
  //}
  //async function ResetWhole() {
    /* firestore
      .collection("recommendation")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            active: "0",
          });
        });
      }); */
  //}

  //const getTime = (e) => {
    //setTime(e.target.value);
  //};

  //async function ResetWholeTime(time) {
    //let timedd = time.substring(0, 2);
    //let timemm = time.substring(3, 5);
    //let timeyyyy = time.substring(6, 10);
    //let timewhole = timeyyyy + "-" + timemm + "-" + timedd;
    //Firestore 8 -> 9
    /* firestore
      .collection("recommendation")
      //.where("timestamp".substring(0,2), "<", timedd && "timestamp".substring(3,5), "<=", timemm && "timestamp".substring(6,10), "<=", timeyyyy)
      .where("timestamp", "<", time)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            active: "0",
          });
        });
      }); */
  //}

  //Firestore 8 -> 9
  //const getUser = () => {
    /* const refuserd = refe.doc(userID);
    refuserd
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUser(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      }); */
  //};

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

  useEffect(() => {
    //getUser();
    userFetch();
    return () => {};
    // eslint-disable-next-line
  }, [1]);

  useEffect(() => {
    if (user.companyid == "420") {
      setAdmin(true);
    }
    return () => {};
    // eslint-disable-next-line
  }, [user]);

  //Firestore 8 -> 9
  //increases the likes counter by one
  const handleLike = async (item) => {
    const scoreLikes = Number(item.likes) + Number(1);
    //const refRecom = ref(refReco, item.id);
    const docRef = doc(db, "recommendation", item.id);
    if(item.users.includes(userID)){
      alert("Schon hierfür abgestimmt");
    }
    else {
      const userArray = [...item.users, userID];
      await updateDoc(docRef, {
        likes: scoreLikes,
        users: userArray
      })
      window.location.reload(false);
    }
    }
{/*}
    if(userarray.includes(userID)){
      alert("Schon hierfür abgestimmt");
    }
    else {
      const userArray = [...item.users, userID];
    await updateDoc(refRecom, {
      likes: scoreLikes,
      users: userArray
    })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      }); 
    }
  };
*/}

  //Firestore 8 -> 9
  //increases the dislikes counter by one
  const handleDislike = async (item) => {
    const scoreLikes = Number(item.dislikes) + Number(1);
    //const refRecom = ref(refReco, item.id);
    const docRef = doc(db, "recommendation", item.id);
    if(item.users.includes(userID)){
      alert("Schon hierfür abgestimmt");
    }
    else {
      const userArray = [...item.users, userID];
      await updateDoc(docRef, {
        dislikes: scoreLikes,
        users: userArray
      })
      window.location.reload(false);
    }
  };

  //Firestore 8 -> 9
  const handleNeutral = async (item) => {
    const scoreLikes = Number(item.neutral) + Number(1);
    //const refRecom = ref(refReco, item.id);
    const docRef = doc(db, "recommendation", item.id);
    if(item.users.includes(userID)){
      alert("Schon hierfür abgestimmt");
    }
    else {
      const userArray = [...item.users, userID];
      await updateDoc(docRef, {
        neutral: scoreLikes,
        users: userArray
      })
      window.location.reload(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Grid
        container
        spacing={4}
        justifyContent="center"
        className={classes.content}
      >
        {/*<Button
          disabled={!admin}
          variant="contained"
          color="primary"
          onClick={() => {
            ResetWhole();
          }}
        >
          Reset ALL
        </Button>*/}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="Ueberschrift"
          label="Datum eingeben: DD-MM-YYYY"
          id="ueberschrift"
          //onChange={getTime}
        />
        {/* <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="Ueberschrift"
          label="Datum eingeben: DD-MM-YYYY"
          minHeight="200"
          id="ueberschrift"
          onChange={getTime}
        /> */}
        {/*<Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          className={classes.submit}
          onClick={() => {
            ResetWholeTime(time);
          }}
        >
          Reset Older
        </Button>*/}

        {/*  list of recommendation to vote */}
        {tips.map((items) => (
          <Grid item xs={12} key={uuidv4()}>
            <Card className={classes.list} key={uuidv4()}>
              <CardContent>
                {/*  card header */}
                <Table>
                  <TableBody>
                    <TableCell className={classes.cardTitle}>
                      <Typography variant="h5" component="h2">
                        {items.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        aria-label="Gute Idee"
                        onClick={() => {
                          handleLike(items);
                        }}
                        size="large"
                      >
                        <ThumbUpIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        aria-label="Hat Aufmerksamkeit verdient"
                        onClick={() => {
                          handleNeutral(items);
                        }}
                        size="large"
                      >
                        <CompareArrowsIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        aria-label="Nicht so toll"
                        onClick={() => {
                          handleDislike(items);
                        }}
                        size="large"
                      >
                        <ThumbDownIcon />
                      </IconButton>
                    </TableCell>
                  </TableBody>
                </Table>
              </CardContent>

              {/*  Card content */}
              <CardContent>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="p"
                  className={classes.p}
                >
                  {items.text}
                </Typography>
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
              </CardContent>
            </Card>
          </Grid>
         ))}      
         </Grid>
       </Container>
     );
   }