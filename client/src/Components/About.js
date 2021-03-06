import React, { Component } from "react";
import axios from "axios";
import downloadDoc from "js-file-download";

class About extends Component {
  state = {
    uploads: null,
    resume: "",
    data: {
      bio: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      city: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      street: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      phone: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      email: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      resume: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      skillMessage: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      contactMessage: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
    },
  };

  download(event, link) {
    event.preventDefault();
    axios({
      method: "GET",
      url: `http://localhost:3001/api/download/${link}`,
      responseType: "blob",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      downloadDoc(res.data, "mathew_cv.pdf");
    });
  }

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

  updateHandler(event) {
    event.preventDefault();
    let data = {
      bio: this.state.data.bio.value,
      phone: this.state.data.phone.value,
      city: this.state.data.city.value,
      street: this.state.data.street.value,
      email: this.state.data.email.value,
      resume: this.state.data.resume.value,
      contactMessage: this.state.data.contactMessage.value,
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

  handleFile = (event) => {
    this.setState({ uploads: event.target.files[0] });
  };

  docHandler(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("file", this.state.uploads);
    axios
      .post("http://localhost:3001/api/user/upload", data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.file + " uploaded successfully");
        } else {
          alert("Can't update resume at the moment");
        }
      });
  }

  render() {
    if (this.props.data) {
      var name = this.props.data.name;
      var bio = this.props.data.bio;
      var street = this.props.data.street;
      var city = this.props.data.city;
      var state = this.props.data.state;
      var phone = this.props.data.phone;
      var email = this.props.data.email;
      var resume = this.props.data.resume;
    }

    return (
      <section id="about">
        {this.props.data === undefined ? (
          <div className="row banner">
            <div className="three columns">
              <div className="eight columns">
                <form onSubmit={(event) => this.updateHandler(event)}>
                  <fieldset>
                    <div>
                      <label htmlFor="bio">
                        Bio <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="bio"
                        value={this.state.data.bio.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "bio" })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="city">
                        City <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="city"
                        value={this.state.data.city.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "city" })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="phone">
                        Phone <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="phone"
                        value={this.state.data.phone.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "phone" })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="street">
                        Street <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="street"
                        value={this.state.data.street.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "street" })
                        }
                      />
                    </div>
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
                      <label htmlFor="resume">
                        Resume <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="resume"
                        value={this.state.data.resume.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "resume" })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="skillmessage">
                        Skill Message <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="skillMessage"
                        value={this.state.data.skillMessage.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "skillMessage" })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="contactmessage">
                        Contact Message <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="contactMessage"
                        value={this.state.data.contactMessage.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "contactMessage" })
                        }
                      />
                    </div>
                    <div>
                      <button
                        className="submit"
                        onSubmit={(event) => this.updateHandler(event)}
                      >
                        Update About
                      </button>
                    </div>
                  </fieldset>
                </form>

                <fieldset>
                  <div>
                    <label htmlFor="resume">
                      Resume <span className="required">*</span>
                    </label>
                    <input type="file" name="file" onChange={this.handleFile} />
                  </div>
                  <div>
                    <button
                      className="submit"
                      onClick={(event) => this.docHandler(event)}
                    >
                      Upload
                    </button>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="three columns">
              {/* <img className="profile-pic"  src={profilepic} alt="Nordic Giant Profile Pic" /> */}
            </div>
            <div className="nine columns main-col">
              <h2>About Me</h2>

              <p>{bio}</p>
              <div className="row">
                <div className="columns contact-details">
                  <h2>Contact Details</h2>
                  <p className="address">
                    <span>{name}</span>
                    <br />
                    <span>
                      {street}
                      <br />
                      {city} {state}
                      {/* , {zip} */}
                    </span>
                    <br />
                    <span>{phone}</span>
                    <br />
                    <span>{email}</span>
                  </p>
                </div>
                <div className="columns download">
                  <p>
                    <div
                      onClick={(e) => this.download(e, resume)}
                      className="button"
                    >
                      <i className="fa fa-download"></i>Download Resume
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default About;
