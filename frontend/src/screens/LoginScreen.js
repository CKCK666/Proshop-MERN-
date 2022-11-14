import React ,{useState,useEffect}from 'react'
import {Link,useNavigate} from "react-router-dom"
import{} from "react-redux"
import FormContainer from '../components/FormContainer'
import { useSelector,useDispatch } from 'react-redux'
import {Login }from "../actions/userAction"
import { Button, Col, Form, Row } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { PRODUCT_LIST_RESET } from '../constants/productConstants'

const LoginScreen = () => {
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

   
 
  const dispatch=useDispatch()
const userLogin=useSelector(state=>state.userLogin)
const{loading,error,userInfo}=userLogin




  useEffect(()=>{
    dispatch({type:PRODUCT_LIST_RESET})
    if(userInfo){
      navigate("/")
    }
    else{
      navigate("/login")
    }
    
    
     
    
  },[userInfo,dispatch,navigate])
 
  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(Login(email,password))
  }
  return (
   <FormContainer>
     <h1>LOGIN</h1>
     {error && <Message variant="danger">{error}</Message>}
    {loading&& <Loader/>}
    
     <Form onSubmit={submitHandler} className="my-3">
       <Form.Group controlId='email'>
         <Form.Label>
           Email Address
         </Form.Label>
         <Form.Control type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}>

         </Form.Control>
       </Form.Group>

       <Form.Group controlId='password' className='my-2'>
         <Form.Label>
          Password
         </Form.Label>
         <Form.Control type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}>

         </Form.Control>
       </Form.Group>


     <Button type='submit' variant='primary' className='my-4'>
       Sign In
     </Button>

     <Row className='py-3'>
       <Col>
       New Customer?
       <Link to="/signup">
         Register
       </Link>
       </Col>
     </Row>




     </Form>
   </FormContainer>
  )
}

export default LoginScreen