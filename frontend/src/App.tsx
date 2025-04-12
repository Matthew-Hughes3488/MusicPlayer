import "./App.scss";
import React, { useState } from 'react';
import {Main} from './containers/Main/Main';
import { Login } from './containers/Login/Login';
import { Header } from "./components/Header/Header";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)

  const authorise = () =>{
    setLoggedIn(!isLoggedIn)
  }

  return (
    <div className="app-wrapper">
      <Header/>
      {isLoggedIn ? <Main/> : <Login authFunction={authorise}/>}
    </div>
  );
}

export default App;