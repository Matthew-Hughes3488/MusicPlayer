import React, { useState } from 'react';
import {Main} from './containers/Main/Main';
import { Login } from './containers/Login/Login';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true)

  return (
    <div className="App">
      {isLoggedIn ? <Main/> : <Login/>}
    </div>
  );
}

export default App;