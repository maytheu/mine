import React, { Component } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import axios from "axios";

// import "./App.css";
import Header from "../Header";
import Footer from "../Footer";
import About from "../About";
import Resume from "../Resume";
import Contact from "../Contact";
//import Portfolio from "./Components/Portfolio";

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {},
      default: {},
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

  getDefault() {
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ default: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      },
    });
  }

  componentDidMount() {
    this.getResumeData();
    this.getDefault();
  }
 
  render() {
    return (
      <div className="App">
        {Object.keys(this.state.resumeData).length !== 0 ? (
          <div>
            <Header auth={true}/>
            <About  />
            <Resume  />
            <Contact  />
            <Footer auth={true} />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default EditPage;
