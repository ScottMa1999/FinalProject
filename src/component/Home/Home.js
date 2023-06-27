import "./Home.css";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// elements
import { Movie } from "../../features/Movies/Movie"; 

export function Home() {

  // selections
  const categories = [
    {
      value: 'Now Playing',
      label: 'Now Playing'
    },
    {
      value: 'Popular',
      label: 'Popular'
    },
    {
      value: 'Top Rated',
      label: 'Top Rated'
    },
    {
      value: 'Upcoming',
      label: 'Upcoming'
    }
  ]

  // API Key
  const api_key = "41e00c2bacf5624d48227c0a03cabd7f";

  // useStates
  const [disabled, setDisabled] = useState(false);
  const [category, setCategory] = useState('Now Playing')
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&page=${page}`);

  // trackOnChanges
  const trackCategoryChange = (e) => setCategory(e.target.value);

  // handleClicks
  // 1. handle pre-page click
  const handlePreClick = () => {
    if (page === 1) {
      setDisabled(true);
    }
    else {
      setPage(pre => pre - 1);
    }
  }
  
  // 2. handle next-page click
  const handleNextClick = () => {
    setDisabled(false);
    setPage(pre => pre + 1);
  }

  // useEffects
  // 1. fetching different endpoints when category changes
  useEffect(() => {
    if (category === 'Popular') {
      setUrl(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${page}`);
    } else if (category === 'Top Rated') {
      setUrl(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&page=${page}`);
    } else if (category === 'Upcoming') {
      setUrl(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&page=${page}`);
    } else if (category === 'Now Playing') {
      setUrl(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&page=${page}`);
    }
  },[category, page])

  return (
    <div className="Home">
      <div className="controller">
        <div className="selection">
          <TextField
            id="standard-select-categories"
            select
            helperText="Select Movie Category"
            variant="standard"
            sx={{ width: "15ch" }}
            value={category}
            onChange={trackCategoryChange}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
           </TextField>
        </div>
        <div className="page">
          <button className="pre-page" onClick={handlePreClick} disabled={disabled}><ChevronLeftIcon sx={{ fontSize: 40 }}/></button>
          <span>{page}</span>
          <button className="next-page" onClick={handleNextClick}><ChevronRightIcon sx={{ fontSize: 40 }}/></button>
        </div>
      </div>
      <Movie url={url}/>
    </div>
  )
}