import React from "react"
import { NavLink, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { userStore } from "../../features/Login/loginSlice"
import { LOGOUT } from "../../features/Login/loginSlice"
import { useNavigate } from "react-router-dom"

export function Layout() {

  // call the redux userStore to help see the user login status
  const { isLoggedin, user, status, error } = useSelector(userStore);

  // initialize the dispatch function
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handleButtonClicks
  const handleLogoutClick = () => {
    dispatch(LOGOUT());
    navigate('/Login');
  }

  return (
    <React.Fragment>
      <header>
        <nav>
          <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="logo" />
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Favorite">Favorite</NavLink>
          <NavLink to="/MyRated">Rated</NavLink>
        </nav>
        <div className="LoginPage">
          {
            isLoggedin ? 
            (
              <div className="login_nav">
              <h2 className="login-email">Hi😊 {user.username}</h2>
              <button className="logout_btn" onClick={handleLogoutClick}>Logout</button>
              </div>
            ):
            <NavLink to="/Login">Login</NavLink>
          }
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  )
}