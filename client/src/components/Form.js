import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";

import "./admin/admin.css";
import useForm from "../form/useForm";
import formValidate from "../form/formValidate";

function Form() {
  const { values, handleChange, handleSubmit, errors } = useForm(
    sendMail,
    formValidate
  );

  function sendMail() {
    axios.post("/api/contact", values).then((res) => {
      if (res.data.succes)
        return alert(
          "Thanks for contaxtingme, will get back to you in less than 48 hours"
        );
      alert(
        "Yo can't send me a mail right now, you an send a personal mail via my email address displayed above"
      );
    });
  }
  return (
    <div className="App">
      <Container className="container">
        <Row>
          <Col>
            <h3 className="title">Care to reach out?</h3>
          </Col>
        </Row>
        <form className="form" onSubmit={handleSubmit}>
          <Row>
            <Col className="input-text">Name</Col>
            <Col>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="input"
              />
            </Col>
          </Row>
          <Row>
            <Col className="input-text">Subject</Col>
            <Col>
              <input
                type="text"
                name="subject"
                onChange={handleChange}
                className="input"
              />
            </Col>
          </Row>
          <Row>
            <Col className="input-text">Email Address</Col>
            <Col>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="input"
              />
            </Col>
          </Row>
          <Row>
            <Col className="input-text">Password</Col>
            <Col>
              <textarea
                name="message"
                onChange={handleChange}
                className="input"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onSubmit={handleSubmit} outline color="primary">
                <i className="fa fa-envelope"></i> Send me mail
              </Button>
            </Col>
          </Row>
        </form>
        <Row>
          <Col style={{ padding: "1rem" }}>
            &copy; {1900 + new Date().getYear()}, Adetunji Mathew
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Form;
