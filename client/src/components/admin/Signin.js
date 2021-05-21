import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import axios from 'axios'

import './admin.css'
import useForm from '../../form/useForm'
import formValidate from '../../form/formValidate'

function Signin (props) {
  const { values, handleChange, handleSubmit, errors } = useForm(
    login,
    formValidate
  )

  function login () {
    axios.post('/api/user_login', values).then((res) => {
      if (res.status === 200) { return props.history.push('/admin/maytheu/resume') }
      alert("You're not allowed here")
      props.history.push('/')
    })
  }
  return (
    <div className='App'>
      <Container className='container'>
        <Row>
          <Col>
            <h3 className='title'>Sign in to Update your resume</h3>
          </Col>
        </Row>
        <form className='form' onSubmit={handleSubmit}>
          <Row>
            <Col className='input-text'>Email Address</Col>
            <Col>
              <input
                type='email'
                name='email'
                onChange={handleChange}
                className='input'
              />
            </Col>
          </Row>
          <Row>
            <Col className='input-text'>Password</Col>
            <Col>
              <input
                type='password'
                name='password'
                onChange={handleChange}
                className='input'
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onSubmit={handleSubmit} outline color='primary'>
                <i className='fa fa-sign-in' /> Sign in
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  )
}

export default Signin
