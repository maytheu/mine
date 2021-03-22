import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import logo from "../../logo.svg";
import Contact from "../Contact";
import Education from "../Education";
import Header from "../Header";
import Project from "../Project";
import Skills from "../Skills";

function EditResume({ data }) {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios.get("/api/user_auth").then((res) => {
        console.log(res)
      if (res.data.success) {
        // axios.get("/api/about").then((res) => {
        //   if (res.data.success) {
            setLoading(false);
            // setUserData(res.data.address);
            setAuth(true);
        //   }
        // });
      }
    });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      ) : auth ? (
        <header>
          <Header data={userData} />
          <Contact data={userData} />
          <Education data={userData} />
          <Skills data={userData} />
          <Project data={userData} />
        </header>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default EditResume;
