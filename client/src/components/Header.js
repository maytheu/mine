import React from "react";
import { Container, Row, Col } from "reactstrap";

function Header({ data }) {
  return (
    <Container className="container">
      <Row>
        {console.log(data)}
        <Col ><h1 className="title">{data.name}</h1></Col>
      </Row>
      <Row>
        <Col className="desc">{data.description}</Col>
      </Row>
    </Container>
  );
}

export default Header;
