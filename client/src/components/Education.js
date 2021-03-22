import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";

import useForm from "../form/useForm";
import formValidate from "../form/formValidate";

function Education({ data, auth }) {
  const { values, handleChange, handleSubmit, errors } = useForm(
    add,
    formValidate
  );

  function add() {
    try {
      axios.post("/api/user/education", values).then((res) => {
        if (res.data.success) return alert("Education added successfully");
        alert("You're not allowed here");
      });
    } catch (e) {
      alert(e);
    }
  }

  return (
    <Container className="container">
      <Row>
        <Col>
          <h2 className="title">Education</h2>
        </Col>
      </Row>
      {auth?auth.isUser ? (
        <form className="form" onSubmit={handleSubmit}>
          <Row>
            <Col className="input-text">Degree class</Col>
            <Col>
              <input
                type="text"
                name="degree"
                onChange={handleChange}
                className="input"
              />
            </Col>
          </Row>
          <Row>
            <Col className="input-text">School attended</Col>
            <Col>
              <input
                type="text"
                name="school"
                onChange={handleChange}
                className="input"
              />
            </Col>
          </Row>
          <Row>
            <Col className="input-text">Year of graduation</Col>
            <Col>
              <input
                type="text"
                name="graduated"
                onChange={handleChange}
                className="input"
              />
            </Col>
          </Row>
          <Row>
            <Col className="input-text">Description</Col>
            <Col>
              <textarea
                name="description"
                onChange={handleChange}
                className="input"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onSubmit={handleSubmit} outline color="primary">
                <i className="fa fa-plus-circle" aria-hidden="true"></i> Add
              </Button>
            </Col>
          </Row>
        </form>
      ) :'': data.education ? (
        data.education.map((school, i) => (
          <div key={i}>
            <Row>
              <Col>
                <h3>{school.school}</h3>
              </Col>
            </Row>
            <Row>
              <Col className="desc">
                {school.degree} . {school.graduated}
              </Col>
            </Row>
            <Row>
              <Col className="desc">{school.description}</Col>
            </Row>
          </div>
        ))
      ) : (
        ""
      )}
    </Container>
  );
}

export default Education;
