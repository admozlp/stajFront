import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    registerResponse : {},
    loginResponse : {},

    isLoginLoading : false,
    isRegisterLoading : false,

    loginError : {},
    registerError : {}  ,
    
    logoutResponse : {},  
}

const BASE_URL = "http://localhost:8080";

export const addUser = createAsyncThunk("auth/addUser", async(values,{rejectWithValue})=>{  
    try{
        const headers = {     
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",             
        }
        const res = await axios.request({
                method: "POST",
                url: `${BASE_URL}/api/v1/ogrenciauth/ogrenci-kayit`,     
                headers: headers,   
                data : values
            })
        return res;
    }catch(err){
        return rejectWithValue(err);
    }
    
})

export const login = createAsyncThunk("auth/login", async(values, {rejectWithValue})=>{
    try{
        const res = await axios.request({ 
            url: `${BASE_URL}/api/v1/auth/giris`,      
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
        return res;
    }catch(err){
        return rejectWithValue(err);
    }

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

      
    return res
});


export const authSlice = createSlice({
    name: 'auth',
    initialState : initialState,
    reducers: {},
    extraReducers :(builder) => {
       //add User
        builder.addCase(addUser.pending, (state)=>{
            state.isRegisterLoading = true
        })

        builder.addCase(addUser.fulfilled, (state, action)=>{            
            state.isRegisterLoading = false
            state.registerResponse = action.payload.data 

            state.loginError = {}
            state.loginResponse = {}
            state.logoutResponse = {}
            
        })
        builder.addCase(addUser.rejected, (state, action)=>{
            state.isRegisterLoading = false            
            state.registerError = action.payload.response;    
            
            state.loginError = {}
            state.loginResponse = {}
            state.logoutResponse = {}
        })      
        
        // login
        builder.addCase(login.pending, (state)=>{
            state.isLoginLoading = true

        })
        builder.addCase(login.fulfilled, (state, action)=>{                      
            state.isLoginLoading = false
            state.loginResponse = action.payload   
            
            state.registerError = {}
            state.registerResponse = {}
            state.logoutResponse = {}
            
        })
        builder.addCase(login.rejected, (state, action)=>{                
            state.isLoginLoading = false            
            state.loginError = action.payload.response;   
            
            state.registerError = {}
            state.registerResponse = {}
            state.logoutResponse = {}
        }) 

        // logout    
        builder.addCase(logout.pending, (state)=>{
            state.isLogoutLoanding=true
        })

        builder.addCase(logout.fulfilled, (state, action)=>{
            state.logoutResponse = action.payload;
            state.isLogoutLoanding= false;

            state.registerError = {}
            state.registerResponse = {}            
            state.isLoginLoading = false
            state.isRegisterLoading = false
            state.loginResponse = {}
            state.loginError = {}            
        })
        builder.addCase(logout.rejected, (state, action)=>{
            state.logoutResponse = false
            state.isLogoutLoanding= false;
            
            state.registerError = {}
            state.registerResponse = {}            
            state.isLoginLoading = false
            state.isRegisterLoading = false
            state.loginResponse = {}
            state.loginError = {}          
        }) 
    }
});

export default authSlice.reducer
