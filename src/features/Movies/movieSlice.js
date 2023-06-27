import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: null,
  status: 'idle',  // 'idle' => hasn't started    'loading' => processing   'succeed' => success fetch   'failed' => failed fetch
  error: null
}

// CreateAsyncThunk to fetch endpoints
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async(url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
)

// MovieSlice
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // PENDING 
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      // FULFILLED
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.movies = action.payload.results;
      })
      // REJECTED
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})

// export for store use
export default movieSlice.reducer;

// export for reading targeted store
// ****** require further deconstruction ******  const { movies, status, error } = useSelector(MovieStore);
export const MovieStore = (state) => state.movies; 