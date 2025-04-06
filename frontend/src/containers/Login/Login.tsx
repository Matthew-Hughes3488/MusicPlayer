import React from "react";
import "./Login.scss"; 
import { Button } from "../../components/Button/Button";

type LoginProps = {
    authFunction : () => void
}

export const Login = ({authFunction} : LoginProps) => {

  return (
    <div className="login-page">
      <h1>Welcome to MusicPlayer</h1>
      <p>To get started, connect your Spotify account:</p>
      <Button buttonName="Connect to Spotify" buttonType="Test" onClick={authFunction}/>
    </div>
  );
};
