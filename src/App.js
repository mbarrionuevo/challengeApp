import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import HeaderApp from "./components/HeaderApp";
import Menu from "./components/Menu";

function App() {
  return (
      <Router>
        <HeaderApp />
        <Menu />
      </Router>
  );
}

export default App;
