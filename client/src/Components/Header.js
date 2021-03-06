import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Header extends Component {
  state = {
    data: {
      email: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      password: {
        value: "",
        validation: {
          required: true,
          minLength: 8,
        },
        valid: false,
      },
      name: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      description: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
    },
    isLoading: false,
    formValid: false,
    success: "",
  };

  updateFields = (data) => {
    const newFormData = { ...this.state.data };
    for (let key in newFormData) {
      newFormData[key].value = data[key];
      newFormData[key].valid = true;
    }

    this.setState({
      data: newFormData,
    });
  };

  getUpdateData() {
    axios({
      method: "GET",
      url: "http://localhost:3001/api/about",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.data.success) {
        this.updateFields(res.data.address);
      } else {
        alert("Can't get user details");
      }
    });
  }

  componentDidMount() {
    if (this.props.auth) {
      this.getUpdateData();
    }
  }

  handleChange = (element) => {
    const updatedOrderForm = { ...this.state.data };
    const updatedFormElement = { ...updatedOrderForm[element] };

    updatedFormElement.value = element.event.target.value;
    updatedOrderForm[element.id] = updatedFormElement;

    let formValid = true;
    formValid = updatedOrderForm[element.id].valid && formValid;

    this.setState({ data: updatedOrderForm, isValidForm: formValid });
  };

  loginHandler = (event) => {
    event.preventDefault();
    let submit = {
      email: this.state.data.email.value,
      password: this.state.data.password.value,
    };
    axios
      .post("http://localhost:3001/api/user_login", submit, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          this.props.history.push("/admin/maytheu/resume");
        } else {
          this.setState({ success: "Invalid email or password" });
        }
      });
  };

  handleLogout(event) {
    event.preventDefault();
    axios({
      method: "GET",
      url: "http://localhost:3001/api/user_logout",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }).then((res) => this.props.history.push("/"));
  }

  updateHandler(event) {
    event.preventDefault();
    let data = {
      name: this.state.data.name.value,
      description: this.state.data.description.value,
    };
    axios
      .post("http://localhost:3001/api/user/edit_about", data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          alert("Resume updated successfully");
        } else {
          alert("Can't update resume at the moment");
        }
      });
  }

  render() {
    if (this.props.data) {
      var project = this.props.data.project;
      var github = this.props.data.github;
      var name = this.props.data.name;
      var description = this.props.data.description;
      var city = this.props.data.city;
      var networks = this.props.data.social.map(function (network) {
        return (
          <li key={network.name}>
            <a href={network.url}>
              <i className={network.className}></i>
            </a>
          </li>
        );
      });
    }

    return (
      <header id="home">
        <ParticlesBg type="triiangle" bg={true} />
        {this.props.data === undefined && this.props.auth === undefined ? (
          <div className="row banner">
            <div className="eight columns">
              <form onSubmit={(event) => this.loginHandler(event)}>
                <fieldset>
                  <div>
                    <label htmlFor="email">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      size="35"
                      name="email"
                      value={this.state.data.email.value}
                      onChange={(event) =>
                        this.handleChange({ event, id: "email" })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="password">
                      Password <span className="required">*</span>
                    </label>
                    <input
                      type="password"
                      size="35"
                      name="password"
                      value={this.state.data.password.value}
                      onChange={(event) =>
                        this.handleChange({ event, id: "password" })
                      }
                    />
                  </div>
                  <div>
                    <button
                      className="submit"
                      onSubmit={(event) => this.loginHandler(event)}
                    >
                      Submit
                    </button>
                  </div>
                </fieldset>
              </form>
              {this.state.success === "" ? "" : this.state.success}
            </div>
          </div>
        ) : this.props.data !== undefined ? (
          <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
              Show navigation
            </a>
            <a className="mobile-btn" href="#home" title="Hide navigation">
              Hide navigation
            </a>

            <ul id="nav" className="nav">
              <li
              // className="current"
              >
                <a className="smoothscroll" href="#home">
                  Home
                </a>
              </li>
              <li>
                <a className="smoothscroll" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="smoothscroll" href="#resume">
                  Resume
                </a>
              </li>
              <li>
                <a className="smoothscroll" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        ) : (
          <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
              Show navigation
            </a>
            <a className="mobile-btn" href="#home" title="Hide navigation">
              Hide navigation
            </a>

            <ul id="nav" className="nav">
              <li
              // className="current"
              >
                <Link className="smoothscroll" to="/">
                  Home
                </Link>
              </li>
              <li>
                <a className="smoothscroll" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="smoothscroll" href="#resume">
                  Resume
                </a>
              </li>
              <li>
                <a className="smoothscroll" href="#contact">
                  Contact
                </a>
              </li>
              <li>
                <div
                  className="smoothscroll"
                  style={{ cursor: "pointer", color: "#fff" }}
                  onClick={(event) => this.handleLogout(event)}
                >
                  Logout
                </div>
              </li>
            </ul>
          </nav>
        )}

        {this.props.data === undefined && this.props.auth === undefined ? (
          ""
        ) : this.props.data !== undefined ? (
          <div className="row banner">
            <div className="banner-text">
              <h1 className="responsive-headline">{name}</h1>
              <h3>{description}.</h3>
              <hr />
              <ul className="social">
                <a href={project} className="button btn project-btn">
                  <i className="fa fa-book"></i>Project
                </a>
                <a href={github} className="button btn github-btn">
                  <i className="fa fa-github"></i>Github
                </a>
              </ul>
            </div>
          </div>
        ) : (
          <div className="row banner">
            <div className="eight columns">
              <form
                onSubmit={(event) => this.updateHandler(event)}
                id="signin"
                name="signin"
              >
                <fieldset>
                  <div>
                    <label htmlFor="name">
                      Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      size="35"
                      id={"name"}
                      name="name"
                      value={this.state.data.name.value}
                      onChange={(event) =>
                        this.handleChange({ event, id: "name" })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="description">
                      Description <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      size="35"
                      name="description"
                      value={this.state.data.description.value}
                      onChange={(event) =>
                        this.handleChange({ event, id: "description" })
                      }
                    />
                  </div>
                  <button
                    className="submit"
                    onSubmit={(event) => this.updateHandler(event)}
                  >
                    Update
                  </button>
                </fieldset>
              </form>
            </div>{" "}
          </div>
        )}

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }
}

export default withRouter(Header);
