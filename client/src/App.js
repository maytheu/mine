import React, { Component } from "react";
import ReactGA from "react-ga";
import axios from "axios";

import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeData: {},
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  getResumeData() {
    axios({
      method: "GET",
      url: "http://localhost:3001/api/about",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.data.success) {
        this.setState({ resumeData: res.data.address });
      } else {
        alert("Can't get user details");
      }
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    return (
      <div className="App">
        {Object.keys(this.state.resumeData).length !== 0 ? (
          <div>
            <Header data={this.state.resumeData} />
            <About data={this.state.resumeData} />
            <Resume data={this.state.resumeData} />
            <Contact data={this.state.resumeData} />
            <Footer data={this.state.resumeData} />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;