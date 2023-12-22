//import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { useLocation } from 'react-router-dom'
import { getAllDogs, orderDogs } from '../../redux/actions/actions';
import Card from '../Card/Card';
//import NavBar from '../Navbar/Nav';
import style from './Cards.module.css'
//const URLS = 'http://localhost:3001/search/name?name='

export default function Cards() {
    const dispatch = useDispatch();
    //estado local donde se almacena lo buscado
    //const [dogos, setDogs] = useState([])
    //const [dogsT, setDogsTemp] = useState([])
    //const [lastSearch, setLastSearch] = useState('');
    //almacena la data de todos los dogs!!
    const dogs = useSelector(state => state.dogs);
    const dogsS = useSelector(state => state.search);
    //cantidad de dogs que se mostraran por pagina
    const dogsPerPage = 8;
    //estado local donde se almacena la pagina actual
    const [currentPage, setCurrentPage] = useState(1);
    //usamos un dispatch para tomar todos los dogs
    useEffect(() => {
        dispatch(getAllDogs());
    }, [dispatch]);
    //añadimos al estado local todos los dogs
    //funcion onsearch
    /* async function onSearch(name) {
        try {
            if (name.length > 0) {
                const response = await axios.get(`${URLS}${name}`);
                if (response.status === 201) {
                    const dataDog = response.data;
                    if (dataDog) {
                        setDogs(dataDog);
                        setLastSearch(name);
                    } else {
                        window.alert("Raza no encontrada");
                    }
                } else {
                    throw new Error('Error de conexion');
                }
            } else if(name.length===0){
                    setDogs(dogs)
                    setLastSearch('');
                }
        } catch (error) {
            console.error('Error', error);
        }
    }*/
    /*const onSearch = (name)=>{
        if(name != ''){
            const dogsTemp = dogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
            setDogsTemp(dogsTemp)
        }
    }*/

    /*const handleSearch = async (searchTerm) => {
        try {
            await dispatch(getDogByName(searchTerm));
        } catch (error) {
            console.error('Error searching for dogs:', error);
        }
    };*/
    //indexcacion y renderizado
    const startIndex = (currentPage - 1) * dogsPerPage;
    const endIndex = startIndex + dogsPerPage;
    const dogsToShow = dogsS.length !== 0 ? dogsS.slice(startIndex, endIndex) : dogs.slice(startIndex, endIndex);
    //const dogsToRend = dogsT.length !== 0 ? dogsT : dogos
    //const dogsToShow = dogsT.length !==0 ? dogsT.slice(startIndex, endIndex) : dogos.slice(startIndex, endIndex);
    //const dox = [].concat(...dogsToShow)
    /*const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };*/
    const handleOrderChange = (order) => {
        dispatch(orderDogs(order));
    };
    //const location = useLocation();
    return (
        <div>
            {/*location.pathname !== "/" && (
                <NavBar onSearch={handleSearch} />
            )*/}
            <div className={style.selectMar}>
                <label>Ordenar por </label>
                <select className={style.orderSe} onChange={(e) => handleOrderChange(e.target.value)}>
                    <option value="A">Nombre (A to Z)</option>
                    <option value="D">Nombre (Z to A)</option>
                    <option value="B">Peso Menor (Imperial)</option>
                    <option value="C">Peso Mayor (Imperial)</option>
                </select>
            </div>
            {dogsToShow.map(dog => (
                <Card
                    key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    height={dog.height}
                    weight={dog.weight}
                    life_span={dog.life_span}
                    temperament={dog.temperament || dog.temperamentos}
                    image={dog.image}
                />
            ))}
            <div>
                {Array.from({ length: Math.ceil((dogsS.length || dogs.length) / dogsPerPage) }, (_, index) => (
                    <button
                        key={`page-${index + 1}`}
                        onClick={() => setCurrentPage(index + 1)}
                        style={{ margin: '5px', padding: '5px' }}
                    >
                        {index + 1}
                    </button>
                ))
                    // Array.from({ length: Math.ceil(location.pathname === "/" ? dogs.length / dogsPerPage : dogos.length / dogsPerPage) }, (_, index) => (
                    //Array.from({ length: Math.ceil( dogsToRender.length / dogsPerPage)}, (_, index) => (
                    /* Array.from({ length: Math.ceil( dogsToShow.length / dogsPerPage)}, (_, index) => (
                     <button
                         key={`page-${index + 1}`}
                         onClick={() => handlePageChange(index + 1)}
                         style={{ margin: '5px', padding: '5px' }}
                     >
                         {index + 1}
                     </button>
                 ))*/
                }
            </div>
        </div>
    );
}