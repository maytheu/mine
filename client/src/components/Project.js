import axios from "axios";
import React from "react";
import { Container, Row, Col, Button } from "reactstrap";

import formValidate from "../form/formValidate";
import useForm from "../form/useForm";

function Project({ data, auth }) {
  const { values, handleChange, handleSubmit, errors } = useForm(
    add,
    formValidate
  );

  function add() {
    try {
      axios.post("/api/user/project", values).then((res) => {
        if (res.data.success) return alert("Project added successfully");
        alert("You're not allowed here");
      });
    } catch (e) {
      alert(e);
    }
  }

  function del(id){
    console.log(id)
  }

  return (
    <Container className="container">
      <Row>
        <Col>
        {console.log(auth)}
          <h2 className="title">Project</h2>
        </Col>
      </Row>
      <Row>
        {auth ? (
          auth.isUser ? (
            <>
              <form className="form" onSubmit={handleSubmit}>
                <Row>
                  <Col className="input-text">Title</Col>
                  <Col>
                    <input
                      type="text"
                      name="title"
                      onChange={handleChange}
                      className="input"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="input-text">Link</Col>
                  <Col>
                    <input
                      type="text"
                      name="link"
                      onChange={handleChange}
                      className="input"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="input-text">Github link</Col>
                  <Col>
                    <input
                      type="text"
                      name="github"
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
                      <i className="fa fa-plus-circle" aria-hidden="true"></i>{" "}
                      Add
                    </Button>
                  </Col>
                </Row>
              </form>
            </>
          ) : (
            ""
          )
        ) : data.work ? (
          data.work.map((project, i) => (
            <Col sm="4" key={i}>
              <Row>
                <Col>
                  <h3>
                    <a href={project.link} style={{ textDecoration: "none" }}>
                      {project.title}
                    </a>
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col className="desc">{project.description}</Col>
              </Row>
              <Row>
                <Col>
                  {auth ? <Button onClick={()=>del(project.id)}>delete</Button> : ""}
                  <a href={project.github}>
                    <Button outline color="info">
                      Find it on <i className="fa fa-github"></i>
                    </Button>
                  </a>
                </Col>
              </Row>
            </Col>
          ))
        ) : (
          ""
        )}
      </Row>
    </Container>
  );
}

export default Project;
