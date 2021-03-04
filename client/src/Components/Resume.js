import React, { Component } from "react";

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
      skillMessage: {
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

  render() {
    if (this.props.data) {
      var skillmessage = this.props.data.skillmessage;
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
                        onSubmit={(event) => this.updateHandler(event)}
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
          <div className="row education">
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
                        onSubmit={(event) => this.updateHandler(event)}
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
                        Level <span className="required">*</span>
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
                        onSubmit={(event) => this.updateHandler(event)}
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
              <p>{skillmessage}</p>

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
