import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import TransactionsList from "./components/search";

function App() {
  return (
    <div className="App">
      <Router>
        <TransactionsList />
      </Router>
    </div>
  );
}

export default App;
