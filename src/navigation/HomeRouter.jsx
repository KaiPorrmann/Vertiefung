import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import HomeScreen from "../screens/HomeScreen";
import HelpScreen from "../screens/HelpScreen";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import Navbar from "../components/NavbarStart";
import PasswortVergessen from "./../components/Login/PasswortVergessen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginRouter from "./LoginRouter";
import { initializeApp } from "firebase/app";

const useStyle = makeStyles()((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const firebaseConfig = {
  apiKey: "AIzaSyAklOBCm3Qsiae1VRA5GGFm2oVNnljXBe8",
  authDomain: "karsten-9aa6c.firebaseapp.com",
  projectId: "karsten-9aa6c",
  storageBucket: "karsten-9aa6c.appspot.com",
  messagingSenderId: "911018607477",
  appId: "1:911018607477:web:d430da8a56a9dbbc15493c"
};


export default function HomeRouter(props) {
  const classes = useStyle();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

  onAuthStateChanged(auth, user => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      // User is signed out
      setIsLoggedIn(false);
    }
  });

  return (
    <>
      {isLoggedIn ? (
        <LoginRouter />
      ) : (
        <>
          <Navbar></Navbar>
          <div className={classes.toolbar}></div>
          <Routes>
            <Route exact path="/home" element={<HomeScreen />} />
            <Route exact path="/hilfe" element={<HelpScreen />} />
            <Route exact path="/anmelden" element={<SigninScreen />} />
            <Route exact path="/registrieren" element={<SignupScreen />} />
            <Route
              exact
              path="/passwort-vergessen"
              element={<PasswortVergessen />}
            />
            <Route path="*" element={<HomeScreen />} />
          </Routes>
        </>
      )}
    </>
  );
}
