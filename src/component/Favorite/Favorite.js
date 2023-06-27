import "./Favorite.css";
import { useSelector, useDispatch } from "react-redux";
import { userStore } from "../../features/Login/loginSlice";
import { favoriteStore } from "../../features/Favorite/favoriteSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchFavorites } from "../../features/Favorite/favoriteSlice";
import StarIcon from '@mui/icons-material/Star';
import { yellow } from "@mui/material/colors";
import { LikedButton } from "../../features/Movies/LikedButton";

export function Favorite() {

  // check user login status
  const { isLoggedin } = useSelector(userStore);
  const { movies, status, error } = useSelector(favoriteStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // track movie changes
  useEffect(() => {
    if (isLoggedin === true) {
      dispatch(fetchFavorites('https://api.themoviedb.org/3/account/19757664/favorite/movies'))
    }
    else {
      navigate('/Login')
    }
  },[])

  useEffect(() => {
    console.log({movies, status, error})
  }, [movies, status, error]);

  // display contents
  let favoriteContent;
  if (status === 'loading') {
    favoriteContent = <div>Loading...</div>
  }
  else if (status === 'succeed') {
    if (Array.isArray(movies.results)) {
      favoriteContent = movies.results.map(movie => (
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
    else {
      favoriteContent = <h2>{movies.results.original_title}</h2>
    }
  }
  else if (status === 'failed') {
    favoriteContent = <div>Error {error}</div>
  }

  return (
    <div className="Favorite">
     {favoriteContent}
    </div>
  )
}