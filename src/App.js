import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// elements & layouts
import { Layout } from './component/layout/Layout';
import { Login } from "./component/Login/Login";
import { Home } from "./component/Home/Home";
import { Favorite } from "./component/Favorite/Favorite";
import { Rated } from "./component/Rated/Rated";
import { Details } from "./component/Details/Details";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />}/>
            <Route path='/Favorite' element={<Favorite />}/>
            <Route path='/MyRated' element={<Rated />}/>
            <Route path='/Login' element={<Login />}/>
            <Route path='/Movies/:id' element={<Details />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
