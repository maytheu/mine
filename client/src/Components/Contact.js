import React, { Component } from "react";
import axios from 'axios'

class Contact extends Component {
  state = {
    data: {
      email: {
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
      subject: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      message: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
    },
  };

  handleChange = (element) => {
    const updatedOrderForm = { ...this.state.data };
    const updatedFormElement = { ...updatedOrderForm[element] };

    updatedFormElement.value = element.event.target.value;
    updatedOrderForm[element.id] = updatedFormElement;

    let formValid = true;
    formValid = updatedOrderForm[element.id].valid && formValid;

    this.setState({ data: updatedOrderForm, isValidForm: formValid });
  };

  handlesubmit(event) {
    event.preventDefault();
    let data = {
      name: this.state.data.name.value,
      email: this.state.data.email.value,
      subject: this.state.data.subject.value,
      message: this.state.data.message.value,
    };
    console.log(data);
  }

  render() {
   console.log( this.state.data)
    if (this.props.data) {
      var name = this.props.data.name;
      var street = this.props.data.street;
      var city = this.props.data.city;
      var state = this.props.data.state;
      var phone = this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">
        <div className="row section-head">
          <div className="two columns header-col">
            <h1>
              <span>Get In Touch.</span>
            </h1>
          </div>

          <div className="ten columns">
            <p className="lead">{message}</p>
          </div>
        </div>

        <div className="row">
          <div className="eight columns">
            <form onSubmit={e=>this.handlesubmit(e)}>
              <fieldset>
                <div>
                  <label htmlFor="contactName">
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
                  <label htmlFor="contactEmail">
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
                  <label htmlFor="contactSubject">Subject</label>
                  <input
                    type="text"
                    size="35"
                    id="subject"
                    name="contactSubject"
                    value={this.state.data.subject.value}
                    onChange={(event) =>
                      this.handleChange({ event, id: "subject" })
                    }
                  />
                </div>

                <div>
                  <label htmlFor="contactMessage">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    cols="50"
                    rows="15"
                    name="message"
                    value={this.state.data.message.value}
                    onChange={(event) =>
                      this.handleChange({ event, id: "message" })
                    }
                  ></textarea>
                </div>

                <div>
                  <button className="submit" onSubmit={this.handlesubmit}>
                    Submit
                  </button>
                  <span id="image-loader">
                    <img alt="" src="images/loader.gif" />
                  </span>
                </div>
              </fieldset>
            </form>

            <div id="message-warning"> Error boy</div>
            <div id="message-success">
              <i className="fa fa-check"></i>Your message was sent, thank you!
              <br />
            </div>
          </div>

          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              <h4>Address and Phone</h4>
              <p className="address">
                {name}
                <br />
                {street} <br />
                {city}, {state}
                {/* {zip} */}
                <br />
                <span>{phone}</span>
              </p>
            </div>

            {/* <div className="widget widget_tweets">
              <h4 className="widget-title">Latest Tweets</h4>
              <ul id="twitter">
                <li>
                  <span>
                    This is Photoshop's version of Lorem Ipsum. Proin gravida
                    nibh vel velit auctor aliquet. Aenean sollicitudin, lorem
                    quis bibendum auctor, nisi elit consequat ipsum
                    <a href="#">http://t.co/CGIrdxIlI3</a>
                  </span>
                  <b>
                    <a href="#">2 Days Ago</a>
                  </b>
                </li>
                <li>
                  <span>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi
                    <a href="#">http://t.co/CGIrdxIlI3</a>
                  </span>
                  <b>
                    <a href="#">3 Days Ago</a>
                  </b>
                </li>
              </ul>
            </div> */}
          </aside>
        </div>
      </section>
    );
  }
}

export default Contact;
