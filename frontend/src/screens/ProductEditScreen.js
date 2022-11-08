import React from 'react';
import { useState, useEffect ,} from 'react';
import {  useNavigate ,useParams} from 'react-router-dom';
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';

import { listProductDetails,updateProduct} from '../actions/productAction';
import Loader from "../components/Loader"
import { PrimaryButton } from "../components/CommonStyle";

const ProductEditScreen = () => {
    const params=useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetails=useSelector(state=>state.productDetails)
  const{loading,error,product}=productDetails
 
  const [productImg, setProductImg] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesc] = useState("");
  const [  countInStock, setCountInStock] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   await dispatch(
      updateProduct({
        id:params.id,
        name,
        brand,
        price,
        description,
        image: productImg,
        countInStock

      })
    )
    navigate("/admin/productlist");
  };


useEffect(()=>{
  
  if(!product.name || product._id !== params.id){
  
    dispatch(listProductDetails(params.id))
  }
  else{
    
  setName(product.name)
  setBrand(product.brand)
  setProductImg(product.image)
  setDesc(product.description)
  setPrice(product.price)
  setCountInStock(product.countInStock)
  }
  
    
  },[product.name,
     product._id, product.brand, 
    
      product.description,
       product.price, product.countInStock,
        params.id, dispatch,product.image])



  return (
    <StyledCreateProduct>
    <StyledForm onSubmit={handleSubmit}>
      <h3>Edit Product</h3>
      <input
        id="imgUpload"
        accept="image/*"
        type="file"
        onChange={handleProductImageUpload}
        required
      />
      <select value={product.brand} onChange={(e) => setBrand(e.target.value)} >
        <option value="">Select Brand</option>
        <option value="iphone">iPhone</option>
        <option value="samsung">Samsung</option>
        <option value="xiomi">Xiomi</option>
        <option value="boat">Boat</option>
        <option value="other">Other</option>
      </select>
      <input
      value={name}
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
       
      />
      <input
      value={price}
        type="number"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      
      />
      <input
      value={description}
        type="text"
        placeholder="Short Description"
        onChange={(e) => setDesc(e.target.value)}
       
      />

          <input
          value={countInStock}
        type="number"
        placeholder="Stock"
        onChange={(e) => setCountInStock(e.target.value)}
       
      />

      <PrimaryButton type="submit">
    submit
      </PrimaryButton>
    </StyledForm>
    <ImagePreview>
      {productImg ? (
        <>
          <img src={productImg} alt="error!" />
        </>
      ) : (
        <p>Product image upload preview will appear here!</p>
      )}
    </ImagePreview>
  </StyledCreateProduct>
  );
};

export default ProductEditScreen;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;