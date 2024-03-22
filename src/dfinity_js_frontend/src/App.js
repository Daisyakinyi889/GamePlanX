import React, { useEffect, useCallback, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import "./App.css";
import Wallet from "./components/Wallet";
import coverImg from "./assets/img/Library.jpg";
import { login, logout as destroy } from "./utils/auth";
import { balance as principalBalance } from "./utils/ledger"
import Cover from "./components/utils/Cover";
import { Notification } from "./components/utils/Notifications";
import Home from "./home/Home";


const App = function AppWrapper() {
  const isAuthenticated = window.auth.isAuthenticated;
 
  return (
    <>
    <Notification />
      {isAuthenticated ? (
        <Container fluid="md">
  
          <main>
            <Home />
          </main>
        </Container>
      ) : (
        <Cover name="Street Food" login={login}  />
      )}
    </>
  );
};

export default App;
