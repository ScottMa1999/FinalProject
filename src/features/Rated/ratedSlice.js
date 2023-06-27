import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ratedMovies: null,
  status: 'idle',
  error: null
}

export const fetchRatedMovies = createAsyncThunk(
  "ratedMovies/fetchRatedMovies",
  async(id) => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/account/${id}/rated/movies`,
      params: {language: 'en-US', page: '1', sort_by: 'created_at.asc'},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWUwMGMyYmFjZjU2MjRkNDgyMjdjMGEwM2NhYmQ3ZiIsInN1YiI6IjY0NzdlMjNlOTM4MjhlMDBiZjljYjUyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7lkYKxuD-JX-flXOlMUQgt9fOwVGgxn_AImk3SQPUkU'
      }
    };

    const res = await axios.request(options);
    return res.data;
  }
)

const ratedSlice = createSlice({
  name: "ratedMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatedMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRatedMovies.fulfilled, (state, action) => {
        state.ratedMovies = action.payload;
        state.status = 'succeed';
      })
      .addCase(fetchRatedMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
})

// export reducer for the store
export default ratedSlice.reducer;

// export target state for useSelector
export const RatedMovieStore = (state) => state.ratedMovies;


