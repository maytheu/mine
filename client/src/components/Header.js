import axios from 'axios'
import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { withRouter } from 'react-router-dom'

import formValidate from '../form/formValidate'

function Header ({ data, auth, ...props }) {
  const [edit, setEdit] = useState(data)

  function editChange (e) {
    setEdit({ ...edit, [e.target.name]: e.target.value })
  }

  function editSubmit (e) {
    e.preventDefault()
    const data = { name: edit.name, description: edit.description }
    try {
      axios
        .post('/api/user/edit_about', data)
        .then(() => alert('Updated succefully'))
    } catch (err) {
      alert(err)
    }
  }

  function home (e) {
    e.preventDefault()
    props.history.push('/')
  }

  function logout (e) {
    e.preventDefault()
    axios.get('/api/user_logout').then(() => props.history.push('/'))
  }

  return (
    <Container className='container'>
      {auth.isUser ? (
        <>
          <Button
            onClick={home}
            outline
            color='info'
            style={{ marginRight: '5rem' }}
          >
            Home
          </Button>
          <Button onClick={logout} outline color='danger'>
            Logout
          </Button>
          <form className='form' onSubmit={editSubmit}>
            <h4 className='title'>Update header</h4>
            <Row>
              <Col className='input-text'>Name</Col>
              <Col>
                <input
                  type='text'
                  name='name'
                  value={edit.name}
                  onChange={editChange}
                  className='input'
                />
              </Col>
            </Row>
            <Row>
              <Col className='input-text'>Description</Col>
              <Col>
                <textarea
                  name='description'
                  value={edit.description}
                  onChange={editChange}
                  className='input'
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onSubmit={editSubmit} outline color='primary'>
                  <i className='fa fa-edit' /> Edit
                </Button>
              </Col>
            </Row>
          </form>
        </>
      ) : (
        <>
          <Row>
            <Col>
              <h1 className='title'>{data.name}</h1>
            </Col>
          </Row>
          <Row>
            <Col className='desc'>{data.description}</Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default withRouter(Header)
