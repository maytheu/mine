import React, { Component } from "react";
import axios from "axios";

class Resume extends Component {
  state = {
    data: {
      degree: {
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
      graduated: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      school: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      company: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      title: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      years: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      level: {
        value: "",
        validation: {
          required: true,
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
      
    },
  };

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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

  educationHandler(event) {
    event.preventDefault();
    let data = {
      degree: this.state.data.degree.value,
      description: this.state.data.description.value,
      school: this.state.data.school.value,
      graduated: this.state.data.graduated.value,
    };
    axios
      .post("http://localhost:3001/api/user/education", data, {
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

  workHandler(event) {
    event.preventDefault();
    let data = {
      company: this.state.data.company.value,
      description: this.state.data.description.value,
      title: this.state.data.title.value,
      years: this.state.data.years.value,
    };
    axios
      .post("http://localhost:3001/api/user/work", data, {
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

  skillsHandler(event) {
    event.preventDefault();
    let data = {
      name: this.state.data.name.value,
      level: this.state.data.level.value,
    };
    axios
      .post("http://localhost:3001/api/user/skills", data, {
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
      var skillMessage = this.props.data.skillMessage;
      var education = this.props.data.education.map(function (education) {
        return (
          <div key={education.school}>
            <h3>{education.school}</h3>
            <p className="info">
              {education.degree} <span>&bull;</span>
              <em className="date">{education.graduated}</em>
            </p>
            <p>{education.description}</p>
          </div>
        );
      });

      var work = this.props.data.work.map(function (work) {
        return (
          <div key={work.company}>
            <h3>{work.company}</h3>
            <p className="info">
              {work.title}
              <span>&bull;</span> <em className="date">{work.years}</em>
            </p>
            <p>{work.description}</p>
          </div>
        );
      });

      var skills = this.props.data.skills.map((skills) => {
        var className = "bar-expand " + skills.name.toLowerCase();
        return (
          <li key={skills.name}>
            <span
              style={{
                width: skills.level,
                backgroundColor: this.getRandomColor(),
              }}
              className={className}
            ></span>
            <em>{skills.name}</em>
          </li>
        );
      });
    }

    return (
      <section id="resume">
        {this.props.data === undefined ? (
          <div className="row banner">
            <div className="three columns">
              <div className="eight columns">
                <form onSubmit={(event) => this.educationHandler(event)}>
                  <fieldset>
                    <div>
                      <label htmlFor="degree">
                        Degree <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="degree"
                        value={this.state.data.degree.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "degree" })
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
                    <div>
                      <label htmlFor="school">
                        School <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="school"
                        value={this.state.data.school.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "school" })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="graduated">
                        Graduated <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="graduated"
                        value={this.state.data.graduated.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "graduated" })
                        }
                      />
                    </div>
                    <div>
                      <button
                        className="submit"
                        onSubmit={(event) => this.educationHandler(event)}
                      >
                        Add Education
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="three columns header-col">
              <h1>
                <span>Education</span>
              </h1>
            </div>

            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">{education}</div>
              </div>
            </div>
          </div>
        )}

        {this.props.data === undefined ? (
          <div className="row work">
            <div className="three columns">
              <div className="eight columns">
                <form onSubmit={(event) => this.workHandler(event)}>
                  <fieldset>
                    <div>
                      <label htmlFor="company">
                        Company <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="company"
                        value={this.state.data.company.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "company" })
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
                    <div>
                      <label htmlFor="title">
                        Title <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="title"
                        value={this.state.data.title.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "title" })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="years">
                        Years <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="years"
                        value={this.state.data.years.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "years" })
                        }
                      />
                    </div>
                    <div>
                      <button
                        className="submit"
                        onSubmit={(event) => this.workHandler(event)}
                      >
                        Add Work
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="row work">
            <div className="three columns header-col">
              <h1>
                <span>Work</span>
              </h1>
            </div>

            <div className="nine columns main-col">{work}</div>
          </div>
        )}
        {this.props.data === undefined ? (
          <div className="row skills">
            <div className="three columns">
              <div className="eight columns">
                <form onSubmit={(event) => this.skillsHandler(event)}>
                  <fieldset>
                    <div>
                      <label htmlFor="name">
                        Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="name"
                        value={this.state.data.name.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "name" })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="level">
                        Level <span className="required">add % to your value</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="level"
                        value={this.state.data.level.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "level" })
                        }
                      />
                    </div>
                    <div>
                      <button
                        className="submit"
                        onSubmit={(event) => this.skillsHandler(event)}
                      >
                        Add Skills
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="row skill">
            <div className="three columns header-col">
              <h1>
                <span>Skills</span>
              </h1>
            </div>

            <div className="nine columns main-col">
              <p>{skillMessage}</p>

              <div className="bars">
                <ul className="skills">{skills}</ul>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default Resume;
