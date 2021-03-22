import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import axios from 'axios';
import fileDownload from 'js-file-download';

function Contact({ data }) {
  function download(e){
    e.preventDefault()
    axios.get(`/api/download/${data.resume}`, {
      responseType: 'blob',
    }).then(res => {
      console.log(res.data)
      fileDownload(res.data, 'MathewAdetunji.pdf');
    });
  }
  return (
    <Container className="container">
      <Row className="contact">
        <Col xs="6">Contact Information</Col>
        <Col xs="6">Find me @</Col>
        <Col xs="6">
        <Row className="contact-info">
            <Col>{data.bio}</Col>
          </Row>
          <Row className="contact-info">
            <Col>{data.street}</Col>
          </Row>
          <Row className="contact-info">
            <Col>
              {data.city} {data.state}, {data.country}{" "}
            </Col>
          </Row>
          <Row className="contact-info">
            <Col>{data.phone}</Col>
          </Row>
          <Row className="contact-info">
            <Col>{data.email}</Col>
          </Row>
        </Col>
        <Col xs="6">
          <Row className="contact-info">
            {data.social
              ? data.social.map((find, i) => (
                  <Col key={i}>
                    <a href={find.url}>
                      <i className={find.className}></i>
                    </a>
                  </Col>
                ))
              : ""}
          </Row>
          <Row>
            <Col>
              <p>
                <Button outline color="info" onClick={download}>
                  <i className="fa fa-download"></i>Download Resume
                </Button>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
