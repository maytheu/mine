import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./layout.css";
import axios from "axios";

import Header from "./components/Header";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Project from "./components/Project";

function App() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/about").then((res) => {
      if (res.data.success) {
        setLoading(false);
        setUserData(res.data.address);
      } else {
        setLoading(false);
        setUserData({ address: "Data not available at the moment" });
      }
    });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      ) : (
        <header>
          <Header data={userData} />
          <Contact data={userData} />
          <Education data={userData} />
          <Skills data={userData} />
          <Project data={userData} />
        </header>
      )}
    </div>
  );
}

export default App;
