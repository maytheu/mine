import React from "react";
import { Container, Row, Col } from "reactstrap";

function Project({ data }) {
  return (
    <Container className="container">
      <Row>
        <Col>
          <h2 className="title">Project</h2>
        </Col>
      </Row>
      <Row>
        {data.project
          ? data.project.map((project, i) => (
              <Col sm="4" key={i}>
                <Row>
                  <Col>
                    <h3>
                      <a href={project.link}>{project.title}</a>
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col>{project.description}</Col>
                </Row>
              </Col>
            ))
          : ""}
      </Row>
    </Container>
  );
}

export default Project;
