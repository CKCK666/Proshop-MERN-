import React ,{useState,useEffect}from 'react'
import {Link,useNavigate,} from "react-router-dom"
import{} from "react-redux"
import FormContainer from '../components/FormContainer'
import { useSelector,useDispatch } from 'react-redux'
import {SignUp }from "../actions/userAction"
import { Table, Button, Col, Form, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDEtails,getUserProfileUpdate } from '../actions/userAction'
import {myOrdersList} from "../actions/orderAction"
const ProfileScreen = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  
  const [confirmPassword,setConfirmPassword]=useState("")
  const [message,setMessage]=useState(null)
 
  
const userLogin=useSelector(state=>state.userLogin)
const{userInfo}=userLogin
const userDetails=useSelector(state=>state.userDetails)
const{loading,error,user}=userDetails

const UserProfileUpadate=useSelector(state=>state.UserProfileUpadate)
const{success}=UserProfileUpadate

const myorders=useSelector(state=>state.myorders)
const{loading:loadingOrders,error:errorOrders,orders}=myorders



  useEffect(()=>{
    if(!userInfo){
      navigate("/login")
    }
    else{
      if(!user.name){
        dispatch(getUserDEtails("profile"))
        dispatch(myOrdersList())
      }
      else{
        setName(user.name)
        setEmail(user.email)
      }
    }
  },[navigate,userInfo,user])
  
  const submitHandler=(e)=>{
    e.preventDefault()
    if(password!==confirmPassword ){
      setMessage("Passwords not matching")
    }
  
    else{
      
      dispatch(getUserProfileUpdate({id:user._id,name,email}))
    }
  
  }
  return (<Row>
    
    <Col md={3}>
    <Link  to="/"  className='btn btn-light my-3'>Go Back</Link>
    <h1>Update profile</h1>
    {message && <Message>{message}</Message>}
    {error && <Message variant="danger">{error}</Message>}
    {success&& <Message variant="success">Update Successfully</Message>}
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
     Update
     </Button>

    



     </Form>
    </Col>
    {!userInfo.isAdmin ?(
      <Col md={9}>
        <h1>MY ORDERS</h1>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) :(
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt ? order.createdAt.substring(0,10): " "}</td>
                      <td>₹{order.totalPrice >> 0}</td>
                      <td>
                        {order.isPaid ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'green' }}
                          ></i>
                        ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                      </td>
                      <td>
                      {order.isDelivered ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'green' }}
                          ></i>
                        ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className='btn-sm' variant='light'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
            
            
            </tbody>
          </Table>
        )}
    </Col>
    ):<h1>.</h1>
    }
    
  </Row>
   
   
  
  )
}

export default ProfileScreen