import './App.css';
import { React, } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Inicio from './components/Inicio/Inicio'
import NavBar from './components/Navbar/Nav'
import Details from './components/Details/Details'
import Cards from './components/Cards/Cards';
import PostDogs from './components/PostDogs/PostDogs'

function App() {

  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && (
        <NavBar />
      )}
      <Routes>
        <Route path="/adddog" element={<PostDogs/>}/>
        <Route path="/home" element={<Cards/>} />
        <Route path="/" element={<Inicio />} />
        <Route path="/dogs/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
