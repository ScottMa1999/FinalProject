import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/Movies/movieSlice";
import detailReducer from "../features/MovieDetails/movieDetailSlice";
import ratedReducer from "../features/Rated/ratedSlice";
import loginReducer from "../features/Login/loginSlice"
import favoriteReducer from "../features/Favorite/favoriteSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    details: detailReducer,
    ratedMovies: ratedReducer,
    user: loginReducer,
    favorites: favoriteReducer,
  }
})