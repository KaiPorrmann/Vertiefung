import { initializeApp } from "firebase/app";
import React, { useState } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import theme from "./styles/themeConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginRouter from "./navigation/LoginRouter";
import HomeRouter from "./navigation/HomeRouter";
import "firebase/compat/firestore";


function App(props) {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAklOBCm3Qsiae1VRA5GGFm2oVNnljXBe8",
    authDomain: "karsten-9aa6c.firebaseapp.com",
    projectId: "karsten-9aa6c",
    storageBucket: "karsten-9aa6c.appspot.com",
    messagingSenderId: "911018607477",
    appId: "1:911018607477:web:d430da8a56a9dbbc15493c"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {isLoggedIn ? <LoginRouter /> : <HomeRouter {...props} />}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
