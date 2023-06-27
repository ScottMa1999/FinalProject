import "./Rated.css";
import { useSelector, useDispatch } from "react-redux";
import { RatedMovieStore } from "../../features/Rated/ratedSlice";
import { userStore } from "../../features/Login/loginSlice";
import { useEffect } from "react";
import { fetchRatedMovies } from "../../features/Rated/ratedSlice";
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import { yellow } from "@mui/material/colors";
import { LikedButton } from "../../features/Movies/LikedButton";

export function Rated() {

  // select rated Movie Store
  const { ratedMovies, status, error } = useSelector(RatedMovieStore);
  const { user } = useSelector(userStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    if (user) {
      dispatch(fetchRatedMovies(user.accountId));
    }
    else {
      navigate('/Login');
    }
  }, [])

  let content;
  if (status === 'loading') {
    content = <div>Loading...</div>
  }
  else if (status === 'succeed') {
    console.log({ratedMovies});
    if (Array.isArray(ratedMovies.results)) {
      content = ratedMovies.results.map(movie => (
        <div key={movie.id} className="Movie">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
          <div className="Movie-content">
            <a href={`/Movies/${movie.id}`}><h2>{movie.original_title}</h2></a>
            <div className="rating">
              <StarIcon sx={{color:yellow[600]}}/>
              <p>{movie.vote_average}</p>
            </div>
            <LikedButton movie={movie}/>
          </div>
        </div>
      ))
    }
  }
  else if (status === 'failed') {
    content = <div>Error: {error}</div>
    console.log(error);
  }

  return (
    <div className="Rated">
      {content}
    </div>
  )
}