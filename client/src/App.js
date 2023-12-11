import './App.css';
import { React, useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import Inicio from './components/Inicio/Inicio'
import Dogs from './components/Dogs/Dogs'
import NavBar from './components/Navbar/Nav'
import Details from './components/Details/Details'
import Cards from './components/Cards/Cards';
const URL = 'http://localhost:3001/dogs/';


function App() {
  const [dogs, setDogs] = useState([]);
  useEffect(() => {
    const allDogs = async () => {
      try {
        const dogos = await axios(URL)
        if (dogos.data) {
          setDogs(dogos.data);
        }
        else {
          window.alert('No hay datos')
        }

      } catch (error) {
        window.alert('Error al obtener datos', error);
      }
    }
    allDogs();
  }, [])
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && (
        <NavBar />
      )}
      {location.pathname === '/home' && (
        <select>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>)}
      <Routes>
        <Route path="/home" element={<Cards dogs={dogs} />} />
        <Route path='/dogs' element={<Dogs />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/dogs/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
