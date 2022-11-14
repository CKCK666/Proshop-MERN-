import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Center from '../components/Center';
import { listUsers, deleteUser, disableUser } from '../actions/userAction';

const UsersManage = () => {
  const [modal, setModal] = useState({
    show: false,
    id: null,
    disable: null,
    name: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  const userDisable = useSelector((state) => state.userDisable);
  const { success } = userDisable;

  const toggleEnableDisable = (id, disable) => {
    dispatch(disableUser(id, disable));
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, successDelete, success,navigate,userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('are you sure')) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <h3>Users</h3>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr id="head">
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>block/unblock</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                
                <td>
                  {user.isDisabled ? (
                    <Button
                      variant="danger"
                      onClick={() => {
                        setModal({
                          show: true,
                          id: user._id,
                          disable: false,
                          name: user.name,
                        });
                      }}
                      style={{ width: '70px' }}
                    >
                      <i className="fas fa-user-slash"></i>
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setModal({
                          show: true,
                          id: user._id,
                          disable: true,
                          name: user.name,
                        });
                      }}
                      style={{ width: '70px' }}
                    >
                      <i className="fas fa-user"></i>
                    </Button>
                  )}
                </td>
                <td>
                 
                  <Button
                    variant="danger"
                    className="btn-sm "
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal
        show={modal.show}
        onHide={() => setModal({ ...modal, show: false })}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="m-2">
          {!modal.disable ? (
            <h5>Are you sure you want to unblock {modal.name}?</h5>
          ) : (
            <h5>Are you sure you want to block {modal.name}?</h5>
          )}
          <Center>
            <Button
              className="mx-3"
              variant="danger"
              onClick={() => {
                toggleEnableDisable(modal.id, modal.disable);
                setModal({ show: false, id: null, disable: null, name: null });
              }}
            >
              Yes
            </Button>
            <Button
              className="mx-3"
              variant="secondary"
              onClick={() =>
                setModal({ show: false, id: null, disable: null, name: null })
              }
            >
              Cancel
            </Button>
          </Center>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UsersManage;
