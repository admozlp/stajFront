import { authSlice } from "../slice/authSlice"
import {combineReducers} from "@reduxjs/toolkit"
import {bookSlice} from "../slice/bookSlice";



export const store = combineReducers({
    auth: authSlice.reducer,
    book:bookSlice.reducer,
});
