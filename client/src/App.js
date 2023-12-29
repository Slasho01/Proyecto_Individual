import './App.css';
import { React, } from "react";
import { useDispatch } from 'react-redux'
import { Route, Routes, useLocation } from "react-router-dom";
import Inicio from './components/Inicio/Inicio'
import Details from './components/Details/Details'
import Cards from './components/Cards/Cards';
import PostDogs from './components/PostDogs/PostDogs'
import NavBar from './components/Navbar/Nav';
import { getDogByName } from './redux/actions/actions'
function App() {
  const dispatch = useDispatch()
  const handleSearch = async (searchTerm) => {
    try {
          await dispatch(getDogByName(searchTerm));
    } catch (error) {
      console.error('Error searching for dogs:', error);
    }
  };
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && (
        <NavBar onSearch={handleSearch} />
      )}
      <Routes>
        <Route path="/home" element={<Cards />} />
        <Route path="/adddog" element={<PostDogs />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/dogs/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
