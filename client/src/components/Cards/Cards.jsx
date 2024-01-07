//import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, orderDogs, getAllTemperaments, filterDogsByTemperaments } from '../../redux/actions/actions';
import Card from '../Card/Card';
import style from './Cards.module.css'

export default function Cards() {
    const dispatch = useDispatch();
    //selector para manejar el estado global de los temperamentos
    const temperaments = useSelector((state) => state.temperament);
    const dogs = useSelector(state => state.dogs);
    const dogsF = useSelector(state => state.search);
    //Estados locales
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const [razaData, setRazaData] = useState({
        name: '',
        height: {
            imperial: '',
            metric: ''
        },
        weight: {
            imperial: '',
            metric: ''
        },
        life_span: '',
        image: '',
    });
    //useffects
    useEffect(() => {
        dispatch(getAllTemperaments());
        dispatch(getAllDogs());
    }, [dispatch]);
    useEffect(() => {
        handleFilterByTemperaments();
    }, [selectedTemperaments]);

    //select filter
    const handleSelectChange = (event) => {
        const selectedName = event.target.options[event.target.selectedIndex].text;
        if (!selectedTemperaments.includes(selectedName) && selectedTemperaments.length < 10) {
            setSelectedTemperaments([...selectedTemperaments, selectedName]);
        }
    };
    //eliminar el temperamento 
    const handleRemoveTemperament = (selectedName) => {
        const actualizarTemperamento = selectedTemperaments.filter(temperament => temperament !== selectedName);
        setSelectedTemperaments(actualizarTemperamento);
    };
    //actualizar los temperamentos
    const handleInputChange = (event) => {
        const { name, value } = event.target
        if (name.includes('.')) {
            const [dataInfo, childDataInfo] = name.split('.');
            setRazaData({
                ...razaData,
                [dataInfo]: {
                    ...razaData[dataInfo],
                    [childDataInfo]: value
                },

            })
        }
        else {
            setRazaData({
                ...razaData,
                [name]: value,
            });
        }
    }
    //filtrado
    const handleFilterByTemperaments = () => {
        dispatch(filterDogsByTemperaments(selectedTemperaments));
    };
    //ordenamiento 
    const handleOrderChange = (order) => {
        dispatch(orderDogs(order));
    };
    //Paginacion
    const dogsPerPage = 8;
    const startIndex = (currentPage - 1) * dogsPerPage;
    const endIndex = startIndex + dogsPerPage;
    const dogsToShow = dogsF.length ===0 ? dogs.slice(startIndex, endIndex) : dogsF.slice(startIndex, endIndex);
    return (
        <div>
            <div className={style.selectMar}>
                <label className={style.lab}>Ordenar por </label>
                <select className={style.orderSe} onChange={(e) => handleOrderChange(e.target.value)}>
                    <option value="A">Nombre (A to Z)</option>
                    <option value="D">Nombre (Z to A)</option>
                    <option value="B">Peso Menor (Imperial)</option>
                    <option value="C">Peso Mayor (Imperial)</option>
                </select>
                <label className={style.lab}>Filtrar por </label>
                <select className={style.orderSe} onChange={handleSelectChange}>
                    {temperaments.map((temperament) => (
                        <option key={temperament.id} value={temperament.id}>
                            {temperament.name}
                        </option>
                    ))}
                </select>
                <div className={style.container}>
                    <ul className={style.selectionn} name='temperament'>
                        {selectedTemperaments.map((selected) => (
                            <label className={style.lab2} key={selected} onChange={handleInputChange} onClick={() => handleRemoveTemperament(selected)}>
                                {selected}
                            </label>
                        ))}
                    </ul>
                </div>
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
                {Array.from({ length: Math.ceil((dogsF.length || dogs.length) / dogsPerPage) }, (_, index) => (
                    <button
                        key={`page-${index + 1}`}
                        onClick={() => setCurrentPage(index + 1)}
                        style={{
                            margin: '5px',
                            padding: '5px',
                            backgroundColor: currentPage === index + 1 ? 'rgb(222, 184, 135)' : 'white', 
                            color: currentPage === index + 1 ? 'white' : 'black', 
                        }}
                    >
                        {index + 1}
                    </button>
                ))
                }
            </div>
        </div>
    );
}