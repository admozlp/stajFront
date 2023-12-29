import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoginLoading: false,
  isRegisterLoading: false,
  isVerifyPending: false,

  registerResponse: {},
  loginResponse: {},
  logoutResponse: {},
  verifyResponse: {},

  loginError: {},
  registerError: {},
  verifyError: {},
};

const BASE_URL = "http://localhost:7000";

export const addUser = createAsyncThunk(
  "auth/addUser",
  async (values, { rejectWithValue }) => {
    try {
      const headers = {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      };
      const res = await axios.request({
        method: "POST",
        url: `${BASE_URL}/api/v1/auth/ogrenci-kayit`,
        headers: headers,
        data: values,
      });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const verifyAccount = createAsyncThunk(
  "auth/verifyAccount",
  async (token, { rejectWithValue }) => {
    try {
      const headers = {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      };
      const res = await axios.request({
        method: "GET",
        url: `${BASE_URL}/api/v1/auth/mail-dogrula?token=${token}`,
        headers: headers,
      });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        url: `${BASE_URL}/api/v1/auth/giris`,
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
        method: "POST",
        data: {
          email: values.email,
          password: values.password,
        },
      });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const token = localStorage.getItem("user-token");
  const res = await axios.request({
      url: `${BASE_URL}/api/v1/auth/logout`,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      method: "GET"      
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return res;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //add User
    builder.addCase(addUser.pending, (state) => {
      state.isRegisterLoading = true;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isRegisterLoading = false;
      state.registerResponse = action.payload.data;

      state.loginError = {};
      state.loginResponse = {};
      state.logoutResponse = {};
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isRegisterLoading = false;
      state.registerError = action.payload.response;

      console.log(state.registerError);

      state.loginError = {};
      state.loginResponse = {};
      state.logoutResponse = {};
    });

    // login
    builder.addCase(login.pending, (state) => {
      state.isLoginLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoginLoading = false;
      state.loginResponse = action.payload;

      state.registerError = {};
      state.registerResponse = {};
      state.logoutResponse = {};
      state.loginError = {};
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoginLoading = false;
      state.loginError = action.payload.response;

      state.registerError = {};
      state.registerResponse = {};
      state.logoutResponse = {};
    });

    // logout
    builder.addCase(logout.pending, (state) => {
      state.isLogoutLoanding = true;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.logoutResponse = action.payload;
      state.isLogoutLoanding = false;

      state.registerError = {};
      state.registerResponse = {};
      state.isLoginLoading = false;
      state.isRegisterLoading = false;
      state.loginResponse = {};
      state.loginError = {};
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.logoutResponse = false;
      state.isLogoutLoanding = false;

      state.registerError = {};
      state.registerResponse = {};
      state.isLoginLoading = false;
      state.isRegisterLoading = false;
      state.loginResponse = {};
      state.loginError = {};
    });

    builder.addCase(verifyAccount.pending, (state) => {
      state.isVerifyPending = true;

      state.registerError = {};
      state.registerResponse = {};
      state.isLoginLoading = false;
      state.isRegisterLoading = false;
      state.loginResponse = {};
      state.loginError = {};
    });
    builder.addCase(verifyAccount.fulfilled, (state, action) => {
      state.verifyResponse = action.payload;
      state.isVerifyPending = false;

      state.registerError = {};
      state.registerResponse = {};
      state.isLoginLoading = false;
      state.isRegisterLoading = false;
      state.loginResponse = {};
      state.loginError = {};
    });
    builder.addCase(verifyAccount.rejected, (state, action) => {
      state.verifyError = action.payload;
      state.isVerifyPending = false;


      state.registerError = {};
      state.registerResponse = {};
      state.isLoginLoading = false;
      state.isRegisterLoading = false;
      state.loginResponse = {};
      state.loginError = {};
    });
  },
});

export default authSlice.reducer;
