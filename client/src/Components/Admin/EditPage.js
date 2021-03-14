import React, { Component } from "react";
import ReactGA from "react-ga";
import axios from "axios";

import Header from "../Header";
import Footer from "../Footer";
import About from "../About";
import Resume from "../Resume";
import { Redirect } from "react-router-dom";

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      userData: {},
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  getData() {
    axios({
      method: "GET",
      url: "http://localhost:3001/api/user_auth",
       withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }).then((res) => this.setState({ userData: res.data }));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="App">
        {Object.keys(this.state.userData).length !== 0 ? (
          this.state.userData.error ? (
            <Redirect to="/" />
          ) : (
            <div>
              <Header auth={this.state.userData} />
              <About auth={this.state.userData}/>
              <Resume auth={this.state.userData}/>
              <Footer auth={this.state.userData} />
            </div>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default EditPage;
