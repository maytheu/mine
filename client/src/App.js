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
import Form from "./components/Form";

function App() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [auth, setAuth]=useState({isUser: false})

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
          <Header data={userData} auth={auth} />
          <Contact data={userData} auth={auth} />
          <Education data={userData} auth={auth} />
          <Skills data={userData} auth={auth} />
          <Project data={userData} auth={auth} />
          <Form />
        </header>
      )}
    </div>
  );
}

export default App;
