import axios from "axios";
import { MY_ORDER_LIST_RESET } from "../constants/orderConstants";
import  host  from "../constants/apiConstants";
import { USER_LOGIN_REQUEST,
     USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,
      USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_FAIL,
       USER_REGISTER_SUCCESS,
       USER_DETAILS_REQUEST,
        USER_DETAILS_SUCCESS, 
        USER_DETAILS_FAIL,
         USER_PROFILE_UPDATE_REQUEST, 
         USER_PROFILE_UPDATE_SUCCESS,
          USER_PROFILE_UPDATE_FAIL,
           USER_DETAILS_RESET, 
           USERS_LIST_REQUEST,
           USERS_LIST_SUCCESS,
           USERS_LIST_FAIL,
           USERS_LIST_RESET,
           USER_DELETE_REQUEST,
           USER_DELETE_SUCCESS,
           USER_DELETE_FAIL,
           USER_DISABLE_REQUEST,
           USER_DISABLE_SUCCESS,
           USER_DISABLE_FAIL} from "../constants/userConstants";

export const Login=(email,password)=>async(dispatch)=>{

    try {
        dispatch({
           type:USER_LOGIN_REQUEST 
        })
      
      const {data}= await axios.post(`${host}/users/login`,{email,password})
      dispatch({
        type:USER_LOGIN_SUCCESS ,
        payload:data

        
     })
       localStorage.setItem("userInfo",JSON.stringify(data))

    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message ?
            error.response.data.message : error.message,
        })
    }

}

export const logout=()=>(dispatch)=>{
  
 localStorage.removeItem("userInfo")
 dispatch({type: USER_LOGOUT})
 dispatch({type:USER_DETAILS_RESET})
 dispatch({type:MY_ORDER_LIST_RESET})
 dispatch({type:USERS_LIST_RESET})

}

export const SignUp=(name,email,password)=>async(dispatch)=>{

    try {
        dispatch({
           type:USER_REGISTER_REQUEST
        })
      
      const {data}= await axios.post(`${host}/users`,{name,email,password})
      dispatch({
        type:USER_REGISTER_SUCCESS ,
        payload:data

        
     })
     dispatch({
        type:USER_LOGIN_SUCCESS ,
        payload:data

        
     })
       localStorage.setItem("userInfo",JSON.stringify(data))

    } catch (error) {
       console.error(error)
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message 
            ?
            error.response.data.message : error.message,
        })
    }

}

export const getUserDEtails=(id)=>async(dispatch,getState)=>{

    try {
        dispatch({
           type:USER_DETAILS_REQUEST
        })
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                "context-type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            },
        }
      const {data}= await axios.get(`${host}/users/${id}`,config)
      dispatch({
        type:USER_DETAILS_SUCCESS,
        payload:data

        
     })
   

    } catch (error) {
       console.error(error)
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message 
            ?
            error.response.data.message : error.message,
        })
    }

}


export const getUserProfileUpdate=(user)=>async(dispatch,getState)=>{


    try {
        dispatch({
           type:USER_PROFILE_UPDATE_REQUEST
        })
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                "context-type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            },
        }
      const {data}= await axios.put(`${host}/users/profile`,user,config)
      
      dispatch({
        type:USER_PROFILE_UPDATE_SUCCESS,
        payload:data

        
     })
   

    } catch (error) {
       console.error(error)
        dispatch({
            type:USER_PROFILE_UPDATE_FAIL,
            payload:error.response && error.response.data.message 
            ?
            error.response.data.message : error.message,
        })
    }

}


//LIST USERS
export const listUsers=()=>async(dispatch,getState)=>{


    try {
        dispatch({
           type:USERS_LIST_REQUEST
        })
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
              
                Authorization:`Bearer ${userInfo.token}`
            },
        }
      const {data}= await axios.get(`${host}/users`,config)
   
      dispatch({
        type:USERS_LIST_SUCCESS,
        payload:data

        
     })
   

    } catch (error) {
       console.error(error)
        dispatch({
            type:USERS_LIST_FAIL,
            payload:error.response && error.response.data.message 
            ?
            error.response.data.message : error.message,
        })
    }

}

export const deleteUser=(id)=>async(dispatch,getState)=>{


    try {
        dispatch({
           type:USER_DELETE_REQUEST
        })
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
              
                Authorization:`Bearer ${userInfo.token}`
            },
        }
      await axios.delete(`${host}/users/${id}`,config)
   
      dispatch({
        type:USER_DELETE_SUCCESS,
      

        
     })
   

    } catch (error) {
       console.error(error)
        dispatch({
            type:USER_DELETE_FAIL,
            payload:error.response && error.response.data.message 
            ?
            error.response.data.message : error.message,
        })
    }

}

export const disableUser = (id, disable) => async (dispatch, getState) => {
    console.log(disable)
    try {
      dispatch({ type: USER_DISABLE_REQUEST })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
  
      const { data } = await axios.patch(
        `${host}/users/${id}`,
        { isDisabled: disable },
        config
      )
      console.log(data, id, disable)
  
      dispatch({ type: USER_DISABLE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: USER_DISABLE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  