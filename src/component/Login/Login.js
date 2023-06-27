import "./Login.css";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userStore } from "../../features/Login/loginSlice";
import { fetchUser } from "../../features/Login/loginSlice";
import { useNavigate } from "react-router-dom";

export function Login() {

  // initialize dispatch function & target Redux userStore
  const dispatch = useDispatch();
  const { isLoggedin, user, status, error } = useSelector(userStore);

  // useStates
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // onChanges
  const trackUserNameChange = e => setUserName(e.target.value);
  const trackPasswordChange = e => setPassword(e.target.value);

  // onClicks
  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(fetchUser({userName, password}));
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  // Navigation
  const navigate = useNavigate();

  // useEffects
  useEffect(() => {
    console.log({ isLoggedin, user, status, error });
  },[isLoggedin, user, status, error]);

  useEffect(() => {
    if (isLoggedin === true) {
      navigate('/');
    }
  }, [isLoggedin, navigate])


  return (
    <div className="Login">
      <Box
        component="form"
        noValidate
        autoComplete="off">
        <div className="loginForm">
          <h1>Login</h1>
          <div className="userName">
            <TextField 
              id="Username" 
              label="Username" 
              variant="standard" 
              value={userName} 
              onChange={trackUserNameChange} 
              sx={{width: '50ch'}}/>
          </div>
          <div className="password">
            <FormControl 
              sx={{ m: 1, width: "50ch" }} 
              variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={trackPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }/>
            </FormControl>
          </div>
          <button className="submitbtn" onClick={handleLogin}>Submit</button>
        </div>
      </Box>
    </div>
  )
}