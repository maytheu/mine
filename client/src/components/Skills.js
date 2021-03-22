import React from "react";
import { Container, Row, Col, Progress } from "reactstrap";

function Skills({ data }) {
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

  return (
    <Container className="container">
      <Row>
        <Col>
          <h2 className="title">Skills</h2>
        </Col>
      </Row>
      <Row>
        <Col className="desc">{data.bio}</Col>
      </Row>
      {data.skills
        ? data.skills.map((skill, i) => (
            <Row key={i}>
              <Col>
                <em>{skill.name}</em>
                <Progress value={"45"} color={getRandomColor()} />
              </Col>
            </Row>
          ))
        : ""}
    </Container>
  );
}

export default Skills;
