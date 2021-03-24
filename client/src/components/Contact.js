import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import fileDownload from "js-file-download";

function Contact({ data, auth }) {
  const [edit, setEdit] = useState(data);

  function editChange(e) {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  }

  function editSubmit(e) {
    e.preventDefault();
    const data = {
      resume: edit.resume,
      email: edit.email,
      phone: edit.phone,
      street: edit.street,
      city: edit.city,
      state: edit.state,
      bio: edit.bio,
    };
    try {
      axios
        .post("/api/user/edit_about", data)
        .then(() => alert("Updated succefully"));
    } catch (err) {
      alert(err);
    }
  }

  function download(e) {
    e.preventDefault();
    try {
      axios
        .get(`/api/download/${data.resume}`, {
          responseType: "blob",
        })
        .then((res) => {
          fileDownload(res.data, "MathewAdetunji.pdf");
        });
    } catch (e) {
      console.log(e);
    }
  }

  function del(id) {
    axios.get(`/api/user/socials/delete?id=${id}`);
  }
  return (
    <Container className="container">
      {auth.isUser ? (
        <>
          <form className="form" onSubmit={editSubmit}>
            <h4 className="title">Update Contact info</h4>
            <Row>
              <Col className="input-text">City</Col>
              <Col>
                <input
                  type="text"
                  name="city"
                  value={edit.city}
                  onChange={editChange}
                  className="input"
                />
              </Col>
            </Row>
            <Row>
              <Col className="input-text">state</Col>
              <Col>
                <input
                  type="text"
                  name="state"
                  value={edit.state}
                  onChange={editChange}
                  className="input"
                />
              </Col>
            </Row>
            <Row>
              <Col className="input-text">Phone</Col>
              <Col>
                <input
                  type="text"
                  name="phone"
                  value={edit.phone}
                  onChange={editChange}
                  className="input"
                />
              </Col>
            </Row>
            <Row>
              <Col className="input-text">Email Address</Col>
              <Col>
                <input
                  type="text"
                  type="email"
                  name="email"
                  onChange={editChange}
                  value={edit.email}
                  className="input"
                />
              </Col>
            </Row>
            <Row>
              <Col className="input-text">Street</Col>
              <Col>
                <input
                  type="text"
                  name="street"
                  value={edit.street}
                  onChange={editChange}
                  className="input"
                />
              </Col>
            </Row>
            <Row>
              <Col className="input-text">Resume</Col>
              <Col>
                <input
                  type="text"
                  name="resume"
                  value={edit.resume}
                  onChange={editChange}
                  className="input"
                />
              </Col>
            </Row>
            <Row>
              <Col className="input-text">Bio</Col>
              <Col>
                <textarea
                  name="bio"
                  value={edit.bio}
                  onChange={editChange}
                  className="input"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onSubmit={editSubmit} outline color="primary">
                  <i className="fa fa-edit"></i> Edit
                </Button>
              </Col>
            </Row>
          </form>
          <Row>
            {data.social
              ? data.social.map((find, i) => (
                  <Col key={i}>
                    <Button onClick={() => del(find.id)}>{find.name}</Button>
                  </Col>
                ))
              : ""}
          </Row>
        </>
      ) : (
        <>
          <Row className="contact">
            <Col xs="6" style={{ paddingBottom: "10px" }}>
              Contact Information
            </Col>
            <Col xs="6">Find me @</Col>
            <Col xs="6">
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
                          <i className={`socials ${find.className}`}></i>
                        </a>
                      </Col>
                    ))
                  : ""}
              </Row>
              <Row>
                <Col>
                  <p style={{ marginTop: "2rem" }}>
                    <Button outline color="info" onClick={download}>
                      <i className="fa fa-download"></i> Download Resume
                    </Button>
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default Contact;
