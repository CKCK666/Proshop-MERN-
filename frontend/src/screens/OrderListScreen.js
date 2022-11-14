import React, {  useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button,} from 'react-bootstrap';
import { listOrders } from '../actions/orderAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { LinkContainer } from 'react-router-bootstrap'

const   OrderListScreen = () => {
  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const OrdersList = useSelector((state) => state.OrdersList);
  const { loading, error, orders } = OrdersList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch,navigate,userInfo]);



  return (
    <>
      <h3>ORDERS</h3>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr id="head">
              <th>Id</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>Paid</th>
              <th>delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.name}</td>
                <td>{order.createdAt ? order.createdAt.substring(0,10): " "}</td>
                <td>{order.totalPrice}</td>
               
                <td>
                  {order.isPaid? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>

                <td>
                    <LinkContainer to={`/admin/order/${order._id}`}>
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
    
    </>
  );
};

export default OrderListScreen ;
