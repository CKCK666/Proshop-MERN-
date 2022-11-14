import axios from "axios";
import constants from "../constants/cartConstants";
import  host  from "../constants/apiConstants";

export const addToCart=(id,quantity)=> async(dispatch,getState)=>{
 
 
  const qty=parseInt(quantity)
 
  
    const {data}=await axios.get(`${host}/products/${id}`)
  
dispatch({
    type:constants.CART_ADD_ITEM,
    payload:{
        product:data._id,
        name:data.name,
        image:data.image,
        price:data.price,
        count:data.countInStock,
        qty
    }
})
localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}


export const removeCartItem=(id)=>(dispatch,getState)=>{
    dispatch({
        type:constants.CART_REMOVE_ITEM,
        payload:id
    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
  
  }

  export const saveShippingAddress=(data)=>(dispatch)=>{
   
      
        dispatch({
          type:constants.SAVE_SHIPPING_ADDRESS,
          payload:data
      })
      localStorage.setItem("shippingAddress",JSON.stringify(data))
      

      return Promise.resolve();

    






   
  
  }

  export const savePaymentMethod=(data)=>(dispatch)=>{
    dispatch({
        type:constants.SAVE_PAYMENT_METHOD,
        payload:data
    })
    localStorage.setItem("paymentMethod",JSON.stringify(data))
     return;
  }

