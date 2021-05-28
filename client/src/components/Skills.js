import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";

import useForm from "../form/useForm";
import formValidate from "../form/formValidate";

function Skills({ data, auth }) {
  // function getRandomColor() {
  //   const letters = [
  //     "success",
  //     "info",
  //     "warning",
  //     "danger",
  //     "primary",
  //     "secondary",
  //     "link",
  //   ];
  //   let color = "";
  //   for (let i = 0; i < letters.length; i++) {
  //     color = letters[Math.floor(Math.random() * 7)];
  //   }
  //   return color;
  // }
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

  function del(id) {
    axios.get(`/api/user/skills/delete?id=${id}`);
  }

  return (
    <Container className="container">
      <Row>
        <Col>
          <h2 className="title">{!auth ? "Skills and Socials" : "Skills"}</h2>
        </Col>
      </Row>
      <Row>
        <Col className="desc">{data.bio}</Col>
      </Row>
      {auth.isUser ? (
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
                  type="text"
                  name="level"
                  onChange={handleChange}
                  className="input"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onSubmit={handleSubmit} outline color="primary">
                  <i className="fa fa-plus-circle" aria-hidden="true" /> Add
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
                  <i className="fa fa-plus-circle" aria-hidden="true" /> Add
                  socials
                </Button>
              </Col>
            </Row>
          </form>
          <Row>
            {data.skills
              ? data.skills.map((find, i) => (
                  <Col key={i}>
                    <Button onClick={() => del(find.id)}>{find.name}</Button>
                  </Col>
                ))
              : ""}
          </Row>
        </>
      ) : data.skills ? (
        data.skills.map((skill, i) => (
          <Row key={i}>
            <Col style={{ paddingBottom: "10px" }}>
              <em>{skill.name}</em>
            </Col>
            <Col style={{ paddingBottom: "10px" }}>
              <em>{skill.level}</em>
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
