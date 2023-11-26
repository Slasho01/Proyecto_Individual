import './App.css';
import { React, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import Inicio from './components/Inicio/Inicio'
import Dogs from './components/Dogs/Dogs'
import NavBar from './components/Navbar/Nav'
import About from './components/About/About';
const URL = 'http://localhost:3001/dogs/';


function App() {
  const [dogs, dogSet] = useState([]);
  const location = useLocation();
  const onSearch = async (dogsId) => {
    const conn = await axios(`${URL}${dogsId}`);
    const dataDogs = conn.data
    try {
      if (conn.status(200)) {
        if (document.getElementById(dataDogs.id) == null) {
          dogSet((oldChars) => [...oldChars, dataDogs]);
        } else {
          window.alert("Woof Woff no existe");
        }
      } else {
        throw new Error('Error de conexion')
      }
    } catch (error) {
      console.error('Error', error)
    }

  }
  return (
    <div className="App">
      {location.pathname !== "/" && (
        <NavBar onSearch={onSearch} />
      )}
      <Routes>
        <Route path="/home" element={<About/>} />
        <Route path='/dogs' element={<Dogs/>} />
        <Route path="/" element={<Inicio/>} />
      </Routes>
    </div>
  );
}

export default App;
