import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import AuthScreen from "./components/AuthScreen/AuthScreen";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Route path="/home" component={HomeScreen} />
        <Route path="/" exact component={AuthScreen} />
      </Router>
    </div>
  );
};

export default App;
