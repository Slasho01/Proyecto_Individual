import './App.css';
import { React, } from "react";
import { Route, Routes } from "react-router-dom";
import Inicio from './components/Inicio/Inicio'
import Details from './components/Details/Details'
import Cards from './components/Cards/Cards';
import PostDogs from './components/PostDogs/PostDogs'

function App() {

  return (
    <div className="App">
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
