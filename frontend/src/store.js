import thunk from "redux-thunk"
import {createStore ,combineReducers,applyMiddleware} from "redux"
import{composeWithDevTools} from "redux-devtools-extension"
import  { productDetailsReducer, productListReducer } from "./reducers/productReducer"
import {cartReducer} from "./reducers/cartReducer"
import {orderReducer,orderDetailsReducer,orderPayReducer,myOrdersReducer} from "./reducers/orderReducer"
import {userReducer,userRegisterReducer,userDetailsReducer,userProfileUpdateReducer,usersListReducer,userDeleteReducer} from "./reducers/userReducer"
const reducer=combineReducers({
    productList:productListReducer, 
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin:userReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetailsReducer,
    UserProfileUpadate:userProfileUpdateReducer,
    OrderCreate:orderReducer,
    OrderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    myorders:myOrdersReducer,
    usersList:usersListReducer,
    userDelete:userDeleteReducer,
})
const cartItemsFromStorage=localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
const userInfoFromStorage=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null
const shippingAddressFromStorage=localStorage.getItem("shippingAddress")?JSON.parse(localStorage.getItem("shippingAddress")):{}

const initialState={
    cart:{cartItems:cartItemsFromStorage,shippingAddress:shippingAddressFromStorage},
    userLogin:{userInfo:userInfoFromStorage}
}
const middleware=[thunk]
const store=createStore (reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
export default store