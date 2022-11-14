import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const navigate=useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
     navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }
  return (
    <>
      <Form onSubmit={submitHandler}  className='ps-3'>
        <Row>
          <Col>
            <Form.Control
              type='text'
              name='q'
              placeholder='Search...'
              className='mr-sm-2 ml-sm-5'
              onChange={(e) => setKeyword(e.target.value)}
            ></Form.Control>
          </Col>
          <Col>
            <Button
              type='submit'
              className='pt-2 pb-2'
              variant='outline-light'
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default SearchBox