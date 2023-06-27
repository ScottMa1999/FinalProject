import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: null,
  status: 'idle',
  error: null
}

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async(url) => {
    const options = {
      method: 'GET',
      url: url,
      params: {language: 'en-US', page: '1', sort_by: 'created_at.asc'},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWUwMGMyYmFjZjU2MjRkNDgyMjdjMGEwM2NhYmQ3ZiIsInN1YiI6IjY0NzdlMjNlOTM4MjhlMDBiZjljYjUyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7lkYKxuD-JX-flXOlMUQgt9fOwVGgxn_AImk3SQPUkU'
      }
    };

    const res = await axios.request(options)
    return res.data;
  }
)

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = 'succeed';
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})

// export reducer for store
export default favoriteSlice.reducer;

// export targeted states
export const favoriteStore = (state) => state.favorites;