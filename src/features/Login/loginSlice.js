import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedin: false,
  user: null,
  status: 'idle',
  error: null
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async({userName, password}) => {

    // set up config for headers
    const config = {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWUwMGMyYmFjZjU2MjRkNDgyMjdjMGEwM2NhYmQ3ZiIsInN1YiI6IjY0NzdlMjNlOTM4MjhlMDBiZjljYjUyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7lkYKxuD-JX-flXOlMUQgt9fOwVGgxn_AImk3SQPUkU'
      }
    }

    // get request token
    const { data: {request_token} } = await axios.get("https://api.themoviedb.org/3/authentication/token/new?api_key=41e00c2bacf5624d48227c0a03cabd7f");

    // validate request token
    await axios.post('https://api.themoviedb.org/3/authentication/token/validate_with_login', {
      username: userName,
      password: password,
      request_token: request_token
    }, config )

   // create session ID
    const { data:{ session_id } } = await axios.post("https://api.themoviedb.org/3/authentication/session/new",
    { request_token: request_token }
    , config );

    // get account ID && account details. 
    const { data:{ id } }= await axios.get('https://api.themoviedb.org/3/account?api_key=41e00c2bacf5624d48227c0a03cabd7f&session_id=7845c858ea6d8b72d481e0c5ee150b9b52580158');

    const userData = {
      username:userName,
      accountId: id,
      sessionId: session_id,
      requestToken: request_token
    };

    localStorage.setItem('user', JSON.stringify(userData));

    return userData;
  }
)

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGOUT: (state) => {
      state.isLoggedin = false;
      state.user = null;
      state.error = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoggedin = true;
        state.status = 'succeed';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      })
  }
})

// return reducer for the store
export default loginSlice.reducer;

// return target store for useSelector
export const userStore = (state) => state.user;

// export actions for dispatch
export const { LOGOUT } = loginSlice.actions;