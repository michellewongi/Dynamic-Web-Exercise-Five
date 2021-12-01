import React, { useEffect, useState } from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";
// Pages import
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import UserProfile from "./pages/UserProfile";
import Header from "./components/Header";
import FirebaseConfig from "./components/FirebaseConfig";

function App() {
  // Track if user is logged in
  const [loggedIn, setLoggedIn] = useState(false);
  // check to see if there is any loading
  const [loading, setLoading] = useState(true);
  // store user information in state
  const [userInformation, setUserInformation] = useState({});
  const [appInitialized, setAppInitialized] = useState(false);
  // Error
  const [errors, setErrors] = useState();

  // Ensure app is initialized when it is ready to be used
  useEffect(() => {
    // Initialize Firebase
    initializeApp(FirebaseConfig);
    setAppInitialized(true);
  }, []);

  // Check to see if user is logged in
  // user loads page, check their status
  // set state accordingly
  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see dcos for a list of available
          setUserInformation(user);
          setLoggedIn(true);
        } else {
          // user is signed out
          setUserInformation({});
          setLoggedIn(false);
        }
        // Whenever state changes setLoading to false
        setLoading(false);
      });
    }
  }, [appInitialized]);

  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUserInformation({});
        setLoggedIn(false);
        setErrors();
      })
      .catch((error) => {
        console.warn(error);
        setErrors(error);
      });
  }

  if (loading || !appInitialized) return null;

  return (
    // fragment bc React only allows you to return a single element
    <>
      <Header logout={logout} loggedIn={loggedIn} />
      {errors && <p className="Error PageWrapper">{errors}</p>}
      <Router>
        <Routes>
          <Route
            path="/user/:id"
            element={
              loggedIn ? (
                <UserProfile userInformation={userInformation} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/create"
            element={
              !loggedIn ? (
                <CreateUser
                  setLoggedIn={setLoggedIn}
                  setUserInformation={setUserInformation}
                  setErrors={errors}
                />
              ) : (
                <Navigate to={`/user/${userInformation.uid}`} />
              )
            }
          />
          <Route
            path="/"
            element={
              !loggedIn ? (
                <Login
                  setLoggedIn={setLoggedIn}
                  setUserInformation={setUserInformation}
                />
              ) : (
                <Navigate to={`/user/${userInformation.uid}`} />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
