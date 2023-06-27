import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  details: null,
  status: 'idle',
  error: null
}

export const fetchDetails = createAsyncThunk(
  'details/fetchDetails',
  async(url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
)

const movieDetailSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.details = action.payload;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
})

// export reducer for the store
export default movieDetailSlice.reducer;

// export targeted state
export const DetailStore = (state) => state.details