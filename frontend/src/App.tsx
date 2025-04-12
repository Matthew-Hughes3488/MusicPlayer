import React, { useState } from 'react';
import {Main} from './containers/Main/Main';
import { Login } from './containers/Login/Login';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)

  const authorise = () =>{
    setLoggedIn(!isLoggedIn)
  }

  return (
    <div className="App">
      {isLoggedIn ? <Main/> : <Login authFunction={authorise}/>}
    </div>
  );
}

export default App;