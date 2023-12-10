import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    registertokens : {},
    logintokens : {},
    isLoading : false,
    loginError:null,
    registerError : null  ,
    logoutSuccess : false,  
}


export const addUser = createAsyncThunk("auth/addUser", async(values)=>{
    const res = await axios.post('http://localhost:8080/api/v1/auth/register', values)
    .then(response =>{
        return response
    }).catch(error =>{
        return error
    })   

    return res;
})

export const login = createAsyncThunk("auth/login", async(values)=>{
    // const res = await axios.post("http://localhost:8080/api/v1/auth/authenticate",values)
    // .then(response =>{
    //     return response
    // }).catch(error =>{
    //     return error
    // }) 
    // return res;

    const res = await axios.request({
        url: "http://localhost:8080/api/v1/auth/authenticate",
         
        headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
        },      

        method: "POST",
        data: {
            email : values.email,
            password: values.password
        }        
    })
    .then(response =>{
        return response
    })
    .catch(error => {
        return error
    })

    return res;
})

export const logout = createAsyncThunk("auth/logout", async()=>{
    const token = localStorage.getItem("user-token")
    const res = await axios.request({
        headers: {       
            'Authorization': `Bearer ${token}`,         
        },
        method: "GET",
        url: "http://localhost:8080/api/v1/auth/logout"
      }).then(response => {
        // console.log(response);
        return response
      }).catch(error=>{
        // console.log(error);
        return error;
      });

      
    return res;
});



export const authSlice = createSlice({
    name: 'auth',
    initialState : initialState,
    reducers: {},
    extraReducers :(builder) => {
        //add User
        builder.addCase(addUser.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(addUser.fulfilled, (state, action)=>{
            state.isLoading = false
            state.registertokens = action.payload
            if(action.payload.response && action.payload.response !== null){
                state.registerError = action.payload.response.data.message;
            }
            state.logoutSuccess = false;
        })
        builder.addCase(addUser.rejected, (state, action)=>{
            state.isLoading = false            
            state.registerError =action.error.message;
        })
        
        // login
        builder.addCase(login.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.logintokens = action.payload
            if(action.payload.response && action.payload.response !== null){
                state.loginError = action.payload.response.data.message;
            }
            state.logoutSuccess = false;
        })
        builder.addCase(login.rejected, (state, action)=>{
            state.isLoading = false
            state.loginError = action.error.message;
        })     
        

        //logout
        builder.addCase(logout.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(logout.fulfilled, (state, action)=>{
            state.isLoading = false;            
            if(action.payload.response && action.payload.response !== null){
                state.logoutSuccess = false;
            }else{
                state.logoutSuccess = true;
            }
        })
        builder.addCase(logout.rejected, (state, action)=>{
            state.isLoading = false            
        }) 
    }
})

export default authSlice.reducer
