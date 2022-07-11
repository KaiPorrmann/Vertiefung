import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomeRouter from "./HomeRouter";
import NotFoundScreen from "../screens/NotFoundScreen";
import { makeStyles } from "tss-react/mui";
import RewardScreen from "../screens/RewardScreen";
import NavBarLogIn from "../components/NavBarLogInFolder/NavBarLogIn";
import Notification from "../components/NavBarLogInFolder/Notification";
import MenuBar from "../components/MenuBar";
import SettingScreen from "../screens/SettingScreen";
import ContentArea from "../components/ContentArea";
import Feedback from "../components/Feedback";
import LearningScreen from "../screens/LearningScreen";
import ChatScreenNeu from "../screens/ChatScreenNeu";
import { initializeApp } from "firebase/app";
import Profile from "../screens/Profile";
import Home from "../screens/Home";


const useStyle = makeStyles()((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

const firebaseConfig = {
  apiKey: "AIzaSyAklOBCm3Qsiae1VRA5GGFm2oVNnljXBe8",
  authDomain: "karsten-9aa6c.firebaseapp.com",
  projectId: "karsten-9aa6c",
  storageBucket: "karsten-9aa6c.appspot.com",
  messagingSenderId: "911018607477",
  appId: "1:911018607477:web:d430da8a56a9dbbc15493c"
};

function LoginRouter() {
  const classes = useStyle();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

  onAuthStateChanged(auth, (user) => {
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
        <div>
          <NavBarLogIn></NavBarLogIn>
          <div className={classes.toolbar}></div>
          <MenuBar></MenuBar>
          <ContentArea>
            <Routes>
              <Route
                exact
                path="/app/notification"
                element={<Notification />}
              />
              <Route exact path="/app/fragen" element={<Feedback />} />
              <Route exact path="/app/social" element={<LearningScreen />} />

              <Route exact path="/app/chat/*" element={<ChatScreenNeu />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/" element={<Home />} />

              <Route exact path="/app/forum" element={<RewardScreen />} />
              <Route exact path="/app/" element={<RewardScreen/>} />
              <Route
                exact
                path="/app/konto-verwalten"
                element={<SettingScreen />}
              />
              <Route path="/" element={<RewardScreen />} />
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </ContentArea>
        </div>
      ) : (
        <HomeRouter />
      )}
    </>
  );
}

export default LoginRouter;
