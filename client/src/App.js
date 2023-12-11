import './App.css';
import { React, } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Inicio from './components/Inicio/Inicio'
import Dogs from './components/Dogs/Dogs'
import NavBar from './components/Navbar/Nav'
import Details from './components/Details/Details'
import Cards from './components/Cards/Cards';

function App() {

  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && (
        <NavBar />
      )}
      <Routes>
        <Route path="/home" element={<Cards/>} />
        <Route path='/dogs' element={<Dogs />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/dogs/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
