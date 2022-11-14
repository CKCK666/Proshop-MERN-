import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import { SignUp } from '../actions/userAction';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { saveShippingAddress } from '../actions/cartAction';
import CheckoutScreen from '../components/CheckoutScreen';

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [pinCode, setPinCode] = useState(shippingAddress.pinCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, pinCode, country }))
     
    
    
      navigate('/payment')
    
    
  };

  return (
    <FormContainer>
      <CheckoutScreen step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler} className="mt-2">
        <Form.Group controlId="address" className="mt-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="mt-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="pinCode" className="mt-2">
          <Form.Label>PinCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="PinCode"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="mt-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-4">
          continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
