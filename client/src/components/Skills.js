import React from "react";
import { Container, Row, Col, Progress, Button } from "reactstrap";
import axios from "axios";

import useForm from "../form/useForm";
import formValidate from "../form/formValidate";

function Skills({ data, auth }) {
  function getRandomColor() {
    var letters = [
      "success",
      "info",
      "warning",
      "danger",
      "primary",
      "secondary",
      "link",
    ];
    var color = "";
    for (var i = 0; i < letters.length; i++) {
      color = letters[Math.floor(Math.random() * 7)];
    }
    return color;
  }
  const { values, handleChange, handleSubmit, errors } = useForm(
    add,
    formValidate
  );

  function add() {
    if (Object.keys(values).length === 2) {
      try {
        axios.post("/api/user/skills", values).then((res) => {
          if (res.data.success) return alert("Skills added successfully");
          alert("You're not allowed here");
        });
      } catch (e) {
        alert(e);
      }
    } else {
      try {
        axios.post("/api/user/socials", values).then((res) => {
          if (res.data.success) return alert("Social added successfully");
          alert("You're not allowed here");
        });
      } catch (e) {
        alert(e);
      }
    }
  }

  return (
    <Container className="container">
      <Row>
        <Col>
          <h2 className="title">
            {!auth ? "Skills and Socials" : "Skills"}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col className="desc">{data.bio}</Col>
      </Row>
      {auth ? (
        auth.isUser ? (
          <>
            <form className="form" onSubmit={handleSubmit}>
              <Row>
                <Col className="input-text">Language</Col>
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
                <Col className="input-text">Level</Col>
                <Col>
                  <input
                    type="number"
                    name="level"
                    onChange={handleChange}
                    className="input"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button onSubmit={handleSubmit} outline color="primary">
                    <i className="fa fa-plus-circle" aria-hidden="true"></i> Add
                    Skills
                  </Button>
                </Col>
              </Row>
            </form>
            <form className="form" onSubmit={handleSubmit}>
              <Row>
                <Col className="input-text">fa className</Col>
                <Col>
                  <input
                    type="text"
                    name="className"
                    onChange={handleChange}
                    className="input"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="input-text">Account Name</Col>
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
                <Col className="input-text">Url</Col>
                <Col>
                  <input
                    type="text"
                    name="url"
                    onChange={handleChange}
                    className="input"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button onSubmit={handleSubmit} outline color="primary">
                    <i className="fa fa-plus-circle" aria-hidden="true"></i> Add
                    socials
                  </Button>
                </Col>
              </Row>
            </form>
          </>
        ) : (
          ""
        )
      ) : data.skills ? (
        data.skills.map((skill, i) => (
          <Row key={i}>
            <Col>
              <em>{skill.name}</em>
              <Progress value={skill.level} color={getRandomColor()} />
            </Col>
          </Row>
        ))
      ) : (
        ""
      )}
    </Container>
  );
}

export default Skills;
