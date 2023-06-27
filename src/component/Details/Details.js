import "./Details.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailStore, fetchDetails } from "../../features/MovieDetails/movieDetailSlice";
import { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import { yellow } from "@mui/material/colors";
import TextField from '@mui/material/TextField';
import { userStore } from "../../features/Login/loginSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Details() {

  // extract the id from the url
  const { id } = useParams();
  const navigate = useNavigate();

  // useStates
  const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/${id}?api_key=41e00c2bacf5624d48227c0a03cabd7f`)
  const [myRate, setMyRate] = useState('');

  // trackOnChanges
  const trackMyRate = (e) => setMyRate(e.target.value);

  // initialize the dispatch function
  const dispatch = useDispatch();

  // target the Redux Details Store
  const { details, status, error } = useSelector(DetailStore);
  const { isLoggedin } = useSelector(userStore);

  // useEffect to fetch endpoint
  useEffect(() => {
    dispatch(fetchDetails(url))
  }, [dispatch, url])

  useEffect(() => {
    console.log({details, status, error})
  },[details, error, status])

  // handleButtonClicks
  const handleRateIt = async(details) => {

    // step 1: check the logging status
    if (isLoggedin) {
      if (!myRate) {
        console.log('Please fill in the rated form before submiting!')
      }
      else {
        console.log({ details, myRate });
        const options = {
          method: 'POST',
          url: `https://api.themoviedb.org/3/movie/${details.id}/rating`,
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWUwMGMyYmFjZjU2MjRkNDgyMjdjMGEwM2NhYmQ3ZiIsInN1YiI6IjY0NzdlMjNlOTM4MjhlMDBiZjljYjUyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7lkYKxuD-JX-flXOlMUQgt9fOwVGgxn_AImk3SQPUkU'
          },
          data: `{"value":${myRate}}`
        };
        const res = await axios.request(options);
        
      }
    }
    else {
      navigate('/Login')
    }
  }

  // display the content
  let content;
  if (status === 'loading') {
    content = <div>Loading...</div>
  }
  else if (status === 'succeed') {
    content = <>
                <div className="poster">
                  <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.original_title} />
                </div>
                <div className="details">
                  <h1>{details.original_title}</h1>
                  <h3>Release Date:</h3>
                  <p>{details.release_date}</p>
                  <h3>Overview:</h3>
                  <p>{details.overview}</p>
                  <h3>Genres:</h3>
                  <div className="genres">{details.genres.map(genre => (
                    <div className="genre" key={genre.id}>
                      <p>{genre.name}</p>
                    </div>
                  ))} </div>
                  <h3>Average Rating:</h3>
                  <div className="average_rating">
                    <StarIcon sx={{color:yellow[600]}}/>
                    <p>{details.vote_average}</p>
                  </div>
                  <h3>Your Rating:</h3>
                  <div className="my_rating">
                    <TextField 
                        id="Rating" 
                        label="Rating" 
                        variant="standard" 
                        value={myRate} 
                        onChange={trackMyRate} 
                        sx={{width: '10ch'}}/>
                    <button onClick={() => handleRateIt(details)} className="rate_btn">Rate it!</button>
                  </div>
                  <h3>Production Companies:</h3>
                  <div className="productionCompanies">
                    {details.production_companies.filter(company => company.logo_path !== null).map(company => (
                      <div className="companyLogo" key={company.id}>
                        <img src={`https://image.tmdb.org/t/p/w500${company.logo_path}`} alt={company.id} />
                      </div>
                    ))}
                  </div>
                </div> 
              </>
  }
  else if (status === 'failed') {
    content = <div>Error:{error}</div>
  }


  return (
    <div className="Details">
      {content}
    </div>
  )
}