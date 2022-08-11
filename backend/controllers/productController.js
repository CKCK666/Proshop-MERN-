

import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
 
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) =>       {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});

const deleteProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);
   if(product){
    await product.remove()
    res.json({message:"product removed"})
   }
  else{
    res.status(404);
    throw new Error('product not found');
  }
      

});

const createProduct = asyncHandler(async (req, res) => {

  const product =new Product({
    name:"sample",
    price:0,
    user:req.user._id,
    image:"image/sample.jpg",
    brand:"sample brand",
    category:"sample",
    countInStock:0,
    numReview:0,
    description:"sample"
  })
  
 const createdProduct=await product.save()
 res.status(201).json(createdProduct)

      

});


const updateProduct = asyncHandler(async (req, res) => {

  const {
    name,
    price,
 
    image,
    brand,
    category,
    countInStock,
    numReview,
    description}=req.body
 
const product =await Product.findById(req.params.id) 
console.log(product)
 if(product){
  product.name=name
  product. price=price
  // product.image=image
  product. brand= brand
  product. category= category
  product.countInStock=  countInStock
  // product. numReview= numReview
  product. description=description

  const updatedProduct=await product.save()
  res.json(updatedProduct)
 }
 else{
  res.status(404);
  throw new Error('product not found');
 }

      

});




export { getProducts, getProductById,deleteProduct,updateProduct,createProduct };
