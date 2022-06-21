import React ,{useState,useEffect}from 'react'
import {Link,useNavigate} from "react-router-dom"
import{} from "react-redux"
import FormContainer from '../components/FormContainer'
import { useSelector,useDispatch } from 'react-redux'
import {SignUp }from "../actions/userAction"
import { Button, Col, Form, Row } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const RegisterScreen = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  
  const [confirmPassword,setConfirmPassword]=useState("")
  const [message,setMessage]=useState(null)
 
  
const userRegister=useSelector(state=>state.userRegister)
const{loading,error,userInfo}=userRegister


   const redirect = "/"
// location.search ? location.search.split|("=")[1] :
  useEffect(()=>{
    if(userInfo){
      navigate("/")
    }
    else{
      navigate("/signup")
    }
  })
  
  const submitHandler=(e)=>{
    e.preventDefault()
    if(password!==confirmPassword ){
      setMessage("Passwords not matching")
    }
  
    else{
      dispatch(SignUp(name,email,password))
    }
  
  }
  return (
   <FormContainer>
     <h1>Sign Up</h1>
    {message && <Message>{message}</Message>}
    {error && <Message variant="danger">{error}</Message>}
    {loading&& <Loader/>}

     <Form onSubmit={submitHandler} className="my-3">
     
     <Form.Group controlId='name'>
         <Form.Label>
          Name
         </Form.Label>
         <Form.Control type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}>

         </Form.Control>
       </Form.Group>
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

       <Form.Group controlId='confirmpassword' className='my-2'>
         <Form.Label>
         Confirm Password
         </Form.Label>
         <Form.Control type="password" placeholder='Confirmpassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}>

         </Form.Control>
       </Form.Group>


     <Button type='submit' variant='primary' className='my-4'>
       Sign In
     </Button>

     <Row className='py-3'>
       <Col>
       New Customer?{" "}
       <Link to={redirect ? `/register ? redirect=${redirect}` :"/register"}>
         Register
       </Link>
       </Col>
     </Row>




     </Form>
   </FormContainer>
  )
}

export default RegisterScreen