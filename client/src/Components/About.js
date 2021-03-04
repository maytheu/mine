import React, { Component } from "react";

class About extends Component {
  state = {
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
    },
  };
  render() {
    if (this.props.data) {
      var name = this.props.data.name;
      // var profilepic= "images/"+this.props.data.image;
      var bio = this.props.data.bio;
      var street = this.props.data.street;
      var city = this.props.data.city;
      var state = this.props.data.state;
      // var zip = this.props.data.address.zip;
      var phone = this.props.data.phone;
      var email = this.props.data.email;
      var resumeDownload = this.props.data.resumedownload;
    }

    return (
      <section id="about">
        {this.props.data === undefined ? (
          <div className="row">
            <div className="three columns">
              <div className="eight columns">
                <form
                  onSubmit={(event) => this.updateHandler(event)}
                  id="about"
                  name="about"
                >
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
                      <button
                        className="submit"
                        onSubmit={(event) => this.updateHandler(event)}
                      >
                        Submit
                      </button>
                    </div>
                  </fieldset>
                </form>
                <form onSubmit={(event) => this.docHandler(event)}>
                  <fieldset>
                    <div>
                      <label htmlFor="bio">
                        Resume <span className="required">*</span>
                      </label>
                      <input
                        type="file"
                        size="35"
                        name="gile"
                        value={this.state.data.bio.value}
                        onChange={(event) =>
                          this.handleFile({ event, id: "bio" })
                        }
                      />
                    </div>
                    <div>
                      <button
                        className="submit"
                        onSubmit={(event) => this.docHandler(event)}
                      >
                        Submit
                      </button>
                    </div>
                  </fieldset>
                </form>
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
                    <a href={resumeDownload} className="button">
                      <i className="fa fa-download"></i>Download Resume
                    </a>
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
