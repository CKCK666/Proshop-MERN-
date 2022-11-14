import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import { SignUp } from '../actions/userAction';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { savePaymentMethod } from '../actions/cartAction';
import CheckoutScreen from '../components/CheckoutScreen';

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutScreen step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler} className="mt-2">
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-4">
          continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
