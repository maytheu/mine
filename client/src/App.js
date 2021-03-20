import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState({});
  const [ loading, setLoading ] = useState(true);

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
        <header className="App-header">loaded
        </header>
      )}
    </div>
  );
}

export default App;
