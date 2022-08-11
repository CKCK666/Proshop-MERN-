import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import {PayPalButton} from "react-paypal-button-v2"

import { useSelector, useDispatch } from 'react-redux';

import {
  Button,
  Col,
  Form,
  ListGroup,
  Row,
  Card,
  Image,
  ListGroupItem,
} from 'react-bootstrap';

import Message from '../components/Message';
import Loader from "../components/Loader"
import {  getOrderdetails ,payOrder,MakeDelivered} from '../actions/orderAction';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
const OrderDetailsScreen = () => {
  
  const dispatch = useDispatch();
  const params=useParams()
  const OrderId=params.id
  const navigate = useNavigate();
  const[sdkReady,setSdkReady]=useState(false)

  const userLogin=useSelector((state)=>state.userLogin)
  const {userInfo}=userLogin
  const OrderDetails=useSelector((state)=>state.OrderDetails)

  const{order,loading,error}=OrderDetails
 
  const orderPay=useSelector((state)=>state.orderPay)

  const{loading:loadingPay,success:successPay}=orderPay



  

  useEffect(()=>{
    const addPayPalScript=async()=>{
      const {data:clientId}=await axios.get("/api/config/paypal")
      console.log(clientId)
      const script=document.createElement("script")
      script.type="text/javascript"
      script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async=true
      script.onload=()=>{
        setSdkReady(true)
      }
     document.body.appendChild(script)
    }

    if(!order || order._id !== OrderId || successPay){
      dispatch({type:ORDER_PAY_RESET})
      dispatch(getOrderdetails(OrderId))
    }
    else if(!order.isPaid){
     
      if(!window.paypal){
        console.log("entered")
        addPayPalScript()
      }
      else{
        setSdkReady(true)
      }

    }
  
  },[order,OrderId])

  const deliverHandler=(id)=>{
    dispatch(MakeDelivered(id))
   
  }

  const sumbitPaymentHandler=(paymentResult)=>{
    console.log(paymentResult)
    dispatch(payOrder(OrderId,paymentResult))
   }
 


  return loading ? <Loader/> :error ? <Message variant="danger">{error}</Message> :
    <>
   
       <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? <Message variant="success">{order.deliveredAt}Delivered</Message>: <Message variant="danger">Not Delivered</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Payment Method</h4>
              <p>
              <strong>Method: </strong>
              {order.paymentMethod}

              </p>
              {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message>:<Message variant="danger">Not Paid</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Order Items</h4>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col>
                          {item.qty}x ${item.price}=${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Discount</Col>
                  <Col></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
          
                {userInfo.isAdmin && !order.isDelivered ? <ListGroup.Item>
                  <Button type='button'
                  className='btn btn-block'
                  onClick={deliverHandler(order._id)}
                  >Mark As Delivered</Button>
                </ListGroup.Item>:<ListGroup.Item>

                {!order.isPaid && !order.isDelivered ?(
                    <ListGroup.Item> 
                        {loadingPay&&<Loader/>} 
                        {!sdkReady? <Loader/>:( 
                         <PayPalButton amount={order.totalPrice} onSuccess={sumbitPaymentHandler}/>
                     
                         )} </ListGroup.Item>
                   ):<h1></h1>}

                </ListGroup.Item>}
            
             



              

            
           

             
            </ListGroup>
          </Card>
        </Col>
      </Row>  
    </>
  
};

export default  OrderDetailsScreen;