import React, {  useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Col, Row,Image } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap"
import Message from '../components/Message';
import Loader from '../components/Loader';
import Swal from 'sweetalert2'
import { listProducts,deleteProduct } from '../actions/productAction';

const ProductListScreen = () => {
  

  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productList =useSelector(state=>state.productList)
  const{loading,error,products}=productList

  const productDelete=useSelector(state=>state.productDelete)
  const{success}=productDelete


  

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate('/login');
    }
  }, [dispatch,navigate,userInfo,success]);

  const deleteHandler = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{
      if(result.isConfirmed){
        dispatch(deleteProduct(id))
      }
    })
   
  };
  return (
    <>
     <Row>
        <Col>
        <h1>Products</h1>
        </Col>
        <Col className="float-right">
           
        </Col>
        <Col className="float-right">
           
        </Col>
        <Col className="float-right">
        <LinkContainer to="/admin/createProduct">
        
            <Button className='my-3' >
              <i className='fas fa-plus'></i>
              create product
            </Button>
            </LinkContainer>
        </Col>
     </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr id="head">
              <th>Image</th>
              <th>Name</th>
              <th>price</th>
            
              <th>brand</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
              <td> <Image src={product.image.url} alt={product.name} fluid rounded  width={100} height={100}/></td>
               <td>{product.name}</td>
               <td>{product.price}</td>
               
                <td>{product.brand}</td>
                <td>
                 <LinkContainer to={`/admin/edit/${product._id}`}>
                 <Button
                   variant="light"
                   className="btn-sm "
                  
                 >
                   <i className="fas fa-edit"></i>
                 </Button>
                 </LinkContainer>
               </td>
                
                <td>
                 
                  <Button
                    variant="danger"
                    className="btn-sm "
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
     
    </>
  );
};

export default  ProductListScreen;
