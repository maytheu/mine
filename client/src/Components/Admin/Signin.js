import React, { Component } from "react";
import ReactGA from "react-ga";

import "../../App.css";
import Header from "../Header";
import Footer from "../Footer";

class Signin extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <div className="App">
          <div>
            <Header />
            <Footer  />
          </div>
      </div>
    );
  }
} 

export default Signin;
