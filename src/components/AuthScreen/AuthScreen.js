import React from "react";
import { Link } from "react-router-dom";
import "./AuthScreen.css";

function AuthScreen() {
  return (
    <div className="authScreen">
      <div className="authScreen__background">
        <img className="logo" src="images/logo.png" alt="Logo" />
        <button className="signIn__button">Sign In</button>
        <div className="authScreen__gradient" />
      </div>

      <main style={{ display: "flex", justifyContent: "center" }}>
        <div className="authScreen__body">
          <h1>Unlimited movies, TV programmes and more.</h1>
          <h2>Watch anywhere at any time.</h2>
          <Link to="/home">
            <button className="main__button">
              <span style={{ marginRight: "6px" }}>GET STARTED</span>{" "}
              <i class="fas fa-arrow-circle-right"></i>
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default AuthScreen;
