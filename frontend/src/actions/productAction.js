import axios from "axios"
import  host  from "../constants/apiConstants";
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_EDIT_FAIL, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"



export const listProducts=(keyword=" ")=> async(dispatch)=>{
    try {
        dispatch({
            type:PRODUCT_LIST_REQUEST
        })
        const {data} = await axios.get(`${host}/products?keyword=${keyword}`)

        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data

        })
    
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }

}

export const listProductDetails=(id)=> async(dispatch)=>{
    
    try {
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        })
        const {data} = await axios.get(`${host}/products/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data

        })
    
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
        
    }

}

export const deleteProduct=(id)=>async(dispatch,getState)=>{

console.log("gggggg")
    try {
        dispatch({
           type:PRODUCT_DELETE_REQUEST
        })
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
              
                Authorization:`Bearer ${userInfo.token}`
            },
        }
     await axios.delete(`${host}/products/${id}`,config)
   
      dispatch({
        type:PRODUCT_DELETE_SUCCESS,
      

        
     })
   

    } catch (error) {
       console.error(error)
        dispatch({
            type:PRODUCT_DELETE_FAIL,
            payload:error.response && error.response.data.message 
            ?
            error.response.data.message : error.message,
        })
    }

}
export const updateProduct=(productsdetails)=>async(dispatch,getState)=>{
 const {id} =productsdetails
 console.log(id)
    try {
        dispatch({
           type:PRODUCT_EDIT_REQUEST
        })
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
              
                Authorization:`Bearer ${userInfo.token}`
            },
        }
     await axios.put(`${host}/products/edit/${id}`,productsdetails,config)
   
      dispatch({
        type:PRODUCT_EDIT_SUCCESS,
      

        
     })
   

    } catch (error) {
       console.error(error)
        dispatch({
            type:PRODUCT_EDIT_FAIL,
            payload:error.response && error.response.data.message 
            ?
            error.response.data.message : error.message,
        })
    }

}

export const createProduct=(productsdetails)=>async(dispatch,getState)=>{


    try {
        dispatch({
           type:PRODUCT_CREATE_REQUEST
        })
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
              
                Authorization:`Bearer ${userInfo.token}`
            },
        }
     await axios.post(`${host}/products/createproduct`,productsdetails,config)
   
      dispatch({
        type:PRODUCT_CREATE_SUCCESS,
      

        
     })
   

    } catch (error) {
       console.error(error)
        dispatch({
            type:PRODUCT_CREATE_FAIL,
            payload:error.response && error.response.data.message 
            ?
            error.response.data.message : error.message,
        })
    }

}



