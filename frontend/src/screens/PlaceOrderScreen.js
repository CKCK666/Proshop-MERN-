import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import { SignUp } from '../actions/userAction';
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
import { saveShippingAddress } from '../actions/cartAction';
import CheckoutScreen from '../components/CheckoutScreen';
import Message from '../components/Message';
import { createOrder } from '../actions/orderAction';

const PlaceOrderScreen = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  //calculate price

  const addDecimal=(num)=>{
    return(Math.round(num*100)/100).toFixed(2)
  }
  cart.itemsPrice = addDecimal(Number( cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )))
  cart.shippingPrice =addDecimal(Number( cart.itemsPrice > 100 ? 100 : 0))
  cart.taxPrice =addDecimal( Number(0.1 * cart.itemsPrice))
  cart.totalPrice =addDecimal(
    Number(cart.taxPrice) +
    Number(cart.shippingPrice) +
    Number(cart.itemsPrice))

    
  const OrderCreate=useSelector((state)=>state.OrderCreate)

  const{order,success,error}=OrderCreate
  const userLogin=useSelector(state=>state.userLogin)
  const{userInfo}=userLogin
  useEffect(()=>{
    if (!userInfo) {
      navigate("/login")
    }
    if(success){
      navigate(`/order/${order._id}`)
    }
  })

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        name:userInfo.name,
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
         paymentMethod: cart.paymentMethod,
         itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutScreen step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Payment Method</h4>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Order Items</h4>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
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
                  <Col>${cart.itemsPrice}</Col>
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
                  <Col>{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
