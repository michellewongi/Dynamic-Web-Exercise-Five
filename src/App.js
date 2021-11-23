import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
  const [userInformation, setUserInformation] = useState({});
  const [appInitialized, setAppInitialized] = useState(false);

  // Ensure app is initialized when it is ready to be used
  useEffect(() => {
    // Initialize Firebase
    initializeApp(FirebaseConfig);
    setAppInitialized(true);
  });

  // Check to see if user is logged in
  // user loads page, check their status
  // set state accordingly
  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserInformation(user);
          setLoggedIn(true);
        } else {
          setUserInformation({});
          setLoggedIn(false);
        }
      });
      setLoading(false);
    }
  }, [appInitialized]);

  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUserInformation({});
        setLoggedIn(false);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  if (loading) return null;

  return (
    // fragment bc React only allows you to return a single element
    <>
      <Header logout={logout} />
      <p>User {loggedIn ? `IS LOGGED IN` : `IS NOT LOGGED IN`}</p>
      <p>Email: {userInformation.email}</p>
      <Router>
        <Routes>
          <Route path="/user/:id" element={<UserProfile />} />
          <Route
            path="/create"
            element={
              <CreateUser
                setLoggedIn={setLoggedIn}
                setUserInformation={setUserInformation}
              />
            }
          />
          <Route
            path="/"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                setUserInformation={setUserInformation}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
