import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import logo from "../../logo.svg";
import Contact from "../Contact";
import Education from "../Education";
import Header from "../Header";
import Project from "../Project";
import Skills from "../Skills";

function EditResume() {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});
  const [userData, setUserData] = useState({});

  function getAuth() {
    axios.get("/api/user_auth").then((res) => {
      axios.get("/api/about").then((resp) => {
        setUserData(resp.data.address);
        setLoading(false);
        setAuth(res.data);
      });
    });
  }
  useEffect(() => {
    getAuth();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      ) : Object.keys(auth).length !== 0 ? (
        auth.error ? (
          <Redirect to="/" />
        ) : (
          <header>
            <Header auth={auth} data={userData} />
            <Contact auth={auth} data={userData} />
            <Education auth={auth} data={userData} />
            <Skills auth={auth} data={userData} />
            <Project auth={auth} data={userData} />
          </header>
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default EditResume;
