import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userStore } from "../Login/loginSlice"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { favoriteStore } from '../Favorite/favoriteSlice';

export function LikedButton({ movie }) {

  // useStates
  const [styles, setStyles] = useState({ color: "white", fontSize: "30px" });

  // check whether the user has logged in
  const { isLoggedin } = useSelector(userStore);
  const { movies: favoriteMovies } = useSelector(favoriteStore)
  const navigate = useNavigate();

  // handleClicks
  const handleLikeClick = async() => {
    if (styles.color === 'white') {
      if (isLoggedin === true) {
        setStyles({ color: "red", fontSize: "30px" })

        // set up axios configure for post request
        const options = {
          method: 'POST',
          url: 'https://api.themoviedb.org/3/account/19757664/favorite',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWUwMGMyYmFjZjU2MjRkNDgyMjdjMGEwM2NhYmQ3ZiIsInN1YiI6IjY0NzdlMjNlOTM4MjhlMDBiZjljYjUyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7lkYKxuD-JX-flXOlMUQgt9fOwVGgxn_AImk3SQPUkU'
          },
          data: {media_type: 'movie', media_id: movie.id, favorite: true}
        };

        const res = await axios.request(options);
        console.log(res);
      }
      else {
        navigate("/Login");
      }
    }
    else {
      if (isLoggedin === true) {
        // need further editing! unclick the like button need to trigger the delete request to the favorite movies
        // hasn't found the delete endpoint
      }
    }
  }

  // setup the initial color
  useEffect(() => {
    if (isLoggedin && favoriteMovies) {
      favoriteMovies.results.map(favoriteMovie => {
        if (favoriteMovie.id === movie.id) {
          setStyles({ color: "red", fontSize: "30px" })
        }
      })
    }
  }, [favoriteMovies, isLoggedin])


  return (
    <>
      <button className="like-btn" onClick={handleLikeClick}>
        <FavoriteBorderOutlinedIcon style={styles} />
      </button>
    </>
  )
}