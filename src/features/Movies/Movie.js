import { useSelector, useDispatch } from "react-redux";
import { MovieStore } from "./movieSlice";
import { fetchMovies } from "./movieSlice";
import { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import "./Movie.css";
import { yellow } from "@mui/material/colors";
import { LikedButton } from "./LikedButton"
import { Link } from "react-router-dom";

export function Movie({ url }) {

  // target movie store
  const { movies, status, error } = useSelector(MovieStore);

  // declare dispatch function
  const dispatch = useDispatch();

  // useEffect
  // 1. fetch movie at the initial render, listen to changes
  useEffect(() => {
    dispatch(fetchMovies(url))
  },[dispatch, url])

  // 2. track the Redux Movie Store Content
  useEffect(() => {
    console.log({movies, status, error});
  },[movies, status, error])

  // Movie List Display
  let content;
  if (status === 'loading') {
    return <div>Loading...</div>
  } else if (status === 'succeed') {
    if (Array.isArray(movies)) {
      content = movies.map(movie => (
        <div key={movie.id} className="Movie">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
          <div className="Movie-content">
            <Link to={`/Movies/${movie.id}`}><h2>{movie.original_title}</h2></Link>
            <div className="rating">
              <StarIcon sx={{color:yellow[600]}}/>
              <p>{movie.vote_average}</p>
            </div>
            <LikedButton movie={movie}/>
          </div>
        </div>
      ))
    }
    else {
      content = <h2>{movies.original_title}</h2>
    }
  } else if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div className="MovieList">
      {content}
    </div>
  )
}