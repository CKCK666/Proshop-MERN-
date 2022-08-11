import React from 'react';
import { useState, useEffect ,} from 'react';
import { Link, useNavigate ,useParams} from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import { SignUp } from '../actions/userAction';
import { Table, Button, Col, Form, Row,Image } from 'react-bootstrap';
import { listProductDetails,updateProduct} from '../actions/productAction';
import Loader from "../components/Loader"
import axios from 'axios';

const ProductEditScreen = () => {
    const params=useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetails=useSelector(state=>state.productDetails)
  const{loading,error,product}=productDetails
 

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [fileInput, setFileInput] = useState("");
  const [selectedFile,setSelectedFile]=useState("")
const [previewSource,setPreviewSource]=useState("")
// const uploadFileHandler=async(e)=>{
// const file=e.target.files[0]
// const formData=new FormData()
// formData.append("image",file)
// setUploading(true)
// try {
//   const config={
//     header:{
//       "Content-Type":"multipart/form-data"
//     }
//   }
//   const{data}=await axios.post("/api/upload",formData,config)
//   setImage(data)
//   setUploading(false)
// } catch (error) {
//   console.error(error)
//   setUploading(false)
// }
// }
const FileInputHandler=async(e)=>{
  const file= await e.target.files[0]
  
  previewFile(file)
}
const previewFile=(file)=>{
  const reader=new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend=()=>{
    setPreviewSource(reader.result)
  }
  console.log(previewSource)
}
useEffect(()=>{
  
  if(!product.name || product._id !== params.id){
  
    dispatch(listProductDetails(params.id))
  }
  else{
    
  setName(product.name)
  setBrand(product.brand)
  setCategory(product.category)
  setDescription(product.description)
  setPrice(product.price)
  setCountInStock(product.countInStock)
  }
  
    
  },[product.name,
     product._id, product.brand, 
     product.category,
      product.description,
       product.price, product.countInStock,
        params.id, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
   const productdetails={name,brand,category,description,price,countInStock}


   dispatch(updateProduct(productdetails,product._id))
     
    
    
    
    
    
  };

  return (
    <FormContainer>
     <Row>
        <Col md={12}>
        <Image alt='iamge' scr={process.env.PUBLIC_URL+`/images/mouse.jpg`} fluid rounded/>
        </Col>
      
        </Row> 
      <h1>EDIT PRODUCT</h1>
      <Form onSubmit={submitHandler} className="mt-2">
        <Form.Group controlId="name" className="mt-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="brand" className="mt-2">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="category" className="mt-2">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="price" className="mt-2">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>
      
        <Form.Group controlId="image" className="mt-2">
          <Form.Label>image</Form.Label>
          <Form.Control
            type="file"
            placeholder="image"
            value={fileInput}
            onChange={FileInputHandler}
          ></Form.Control>
        
        </Form.Group>
         
         
        
     

        <Form.Group controlId="description" className="mt-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="countInStock" className="mt-2">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="text"
            placeholder="countInStock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>
      
        

        <Button type="submit" variant="primary" className="my-4">
          update
        </Button>
        
       
      
      </Form>
     
    </FormContainer>
  );
};

export default ProductEditScreen;