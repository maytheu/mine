import React, { Component } from "react";

class Footer extends Component {
  state = {
    data: {
      className: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      url: {
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
  render() {
    if (this.props.data) {
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
      <footer>
        {this.props.auth === undefined ? (
          <div className="row">
            <div className="twelve columns">
              <ul className="social-links">{networks}</ul>

              <ul className="copyright">
                <li>
                  &copy; Copyright {1900 + new Date().getYear()} Adetunji Mathew
                </li>
                <li>
                  Design by{" "}
                  <a title="Styleshout" href="http://www.styleshout.com/">
                    Styleshout
                  </a>
                </li>
              </ul>
            </div>
            <div id="go-top">
              <a className="smoothscroll" title="Back to Top" href="#home">
                <i className="icon-up-open"></i>
              </a>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="three columns">
              <div className="eight columns">
                <form
                  onSubmit={(event) => this.updateHandler(event)}
                  id="social"
                  name="social"
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
                      <label htmlFor="className">
                        ClassName <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="className"
                        value={this.state.data.className.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "className" })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="url">
                        Url <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        size="35"
                        name="url"
                        value={this.state.data.url.value}
                        onChange={(event) =>
                          this.handleChange({ event, id: "url" })
                        }
                      />
                    </div>
                    <div>
                      <button
                        className="submit"
                        onSubmit={(event) => this.updateHandler(event)}
                      >
                        Add Socials
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        )}
      </footer>
    );
  }
}

export default Footer;
