import React from "react";
import { Container, Row, Col } from "reactstrap";

function Education({ data }) {
  return (
    <Container className="container">
      <Row>
        <Col>
          <h2 className="title">Education</h2>
        </Col>
      </Row>
      {data.education
        ? data.education.map((school, i) => (
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
        : ""}
    </Container>
  );
}

export default Education;
