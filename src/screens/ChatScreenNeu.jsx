import React, { useState, Fragment } from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import AuthProvider from "../context/auth";
//import { AuthProvider } from "../backend/AuthContext";
import Navbar from "../components/Navbar";
import Profile from "./Profile";
import Home from "./Home";
import "../ChatScreenNeu.css";
import PrivateRoute from "../components/PrivateRoute";
import ReactDOM from "react-dom";

// const root = ReactDOM.createRoot(document.getElementById('root'));

function ChatScreenNeu() {
  return (
    // ReactDOM.render(
    // root.render(
    <AuthProvider>
      {/* <BrowserRouter>  */}
      <React.StrictMode>
        {/* <Fragment> */}
        <Navbar />
        <Switch>
          {/*<Route exact path="/anmelden" element ={<SignIn/>} />*/}
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/" element={<Home />} />
        </Switch>
      </React.StrictMode>
      {/* </Fragment> */}
      {/* </BrowserRouter>  */}
    </AuthProvider>
    //  ,
    //  document.getElementById("root")
  );
}

export default ChatScreenNeu;
