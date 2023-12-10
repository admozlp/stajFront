import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoading: false,
    isDeleting: false,
    isAdding: false,
    getBookByIdLoading: false,
    isUpdating : false,

    allBooks : [],
    bookCount:null,
    deleteResponse:{},
    addBookResponse:null,
    getBookByIdResponse: null,
    updateBookResponse: null,

    bookLoadingError :null,
    countError: null,
    deleteError: null,
    addBookError: null,
    getBookByIdError:null,
    updateBookError: null,
}

const BASE_URL = "http://localhost:8080";

export const getBookCount = createAsyncThunk("book/getBookCount", async()=>{
    const token = localStorage.getItem("user-token");
    console.log(token);
    const headers = {
        'Authorization': `Bearer ${token}`,              
    }
    
    const res = await axios.get(`${BASE_URL}/api/v1/books/getBookCount`, { headers })

    return res;
})


export const getAllBook = createAsyncThunk("book/getAllBook", async(pageNo)=>{
    const token = localStorage.getItem("user-token");

    const headers = {
        'Authorization': `Bearer ${token}`,              
    }

    const res = await axios.get(`${BASE_URL}/api/v1/books/getAllByPage`, { headers ,    
        params: {
            pageNo: pageNo,
            pageSize: 20
        }
      })
    return res;
});

export const deleteBook = createAsyncThunk("book/deleteBook", async(bookId)=>{
    const token = localStorage.getItem("user-token");

    const headers = {
        'Authorization': `Bearer ${token}`,              
    }

    const res = await axios.delete(`${BASE_URL}/api/v1/books`, {
        headers,
        params: {id: bookId}
    })

    return res;
})

export const addBook = createAsyncThunk("book/addBook", async(values)=>{
    const token = localStorage.getItem("user-token");

    const headers = {
        'Authorization': `Bearer ${token}`, 
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",             
    }

    const res = await axios.request({
        method: "POST",
        url: `${BASE_URL}/api/v1/books`,
        headers: headers,
        data : values
    })

    return res;
})

export const getBookById = createAsyncThunk("book/getBookById", async(id)=>{
    const token = localStorage.getItem("user-token");

    const headers = {
        'Authorization': `Bearer ${token}`, 
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",             
    }

    const res = await axios.request({
        method: "GET",
        url: `${BASE_URL}/api/v1/books/${id}`,
        headers: headers,        
    })

    return res;
});

export const updateBook = createAsyncThunk("book/updateBook", async(values)=>{
    const token = localStorage.getItem("user-token");

    const headers = {
        'Authorization': `Bearer ${token}`, 
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",             
    }

    const res = await axios.request({
        method: "PUT",
        url: `${BASE_URL}/api/v1/books`,
        headers: headers,  
        data:values      
    })

    return res;
});


export const bookSlice = createSlice({
    name:"book",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        // getAllBook
        builder.addCase(getAllBook.pending, (state)=>{
            state.deleteResponse = {} 
            state.isLoading=true;
        })
        builder.addCase(getAllBook.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.allBooks = action.payload.data.data;        
        })
        builder.addCase(getAllBook.rejected, (state, action)=>{
            state.isLoading=false;
            state.bookLoadingError=action.error.code;  
        })    

        //bookCount
        builder.addCase(getBookCount.pending, (state)=> {
            state.isLoading = true
        })
        builder.addCase(getBookCount.fulfilled, (state, action)=>{
            state.isLoading = false
            state.bookCount = action.payload.data;
        })
        builder.addCase(getBookCount.rejected, (state, action)=>{
            state.isLoading = false;
            state.countError = action.error.message;
        })

        //deleteBook
        builder.addCase(deleteBook.pending, (state)=>{
            state.isDeleting = true
        })
        builder.addCase(deleteBook.fulfilled, (state, action)=>{
            state.isDeleting = false;
            state.deleteResponse = action.payload.data
            
            const bookId = state.deleteResponse.data.id;    
            state.allBooks =  state.allBooks.filter(book=>book.id !== bookId)

        })
        builder.addCase(deleteBook.rejected, (state, action)=>{
            state.isDeleting = false;
            state.deleteError = action.error.message;
        })

        // addBook
        builder.addCase(addBook.pending, (state)=>{
            state.isAdding = true
            state.addBookResponse = null
        })
        builder.addCase(addBook.fulfilled, (state, action)=>{
            state.isAdding = false;
            state.addBookResponse = action.payload.data;
            state.allBooks = [...state.allBooks, action.payload.data.data]     
        })
        builder.addCase(addBook.rejected, (state, action)=>{            
            state.isAdding = false;
            state.addBookError = action.error.code     
            state.addBookResponse = null;       
        })

        // getBookById
        builder.addCase(getBookById.pending, (state)=>{
            state.updateBookError = null;
            state.updateBookResponse = null;
            state.getBookByIdLoading = true;
        })
        builder.addCase(getBookById.fulfilled, (state, action)=>{
            state.getBookByIdLoading = false;
            state.getBookByIdResponse = action.payload.data.data;
        })
        builder.addCase(getBookById.rejected, (state,action)=>{
            state.getBookByIdLoading = false;
            state.getBookByIdError =  action.error.code;
        })

        //updateBook
        builder.addCase(updateBook.pending, (state)=>{
            state.isUpdating = true;
        })
        builder.addCase(updateBook.fulfilled, (state, action)=>{
            state.isUpdating = false;
            state.updateBookResponse = action.payload.data;
            state.getBookByIdResponse = action.payload.data.data          
        })
        builder.addCase(updateBook.rejected, (state, action)=>{
            state.isUpdating = false;
            state.updateBookError = action.error.code;
        })
    }
});

export default bookSlice.reducer