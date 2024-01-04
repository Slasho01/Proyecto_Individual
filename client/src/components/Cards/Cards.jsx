//import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, orderDogs, getAllTemperaments, filterDogsByTemperaments } from '../../redux/actions/actions';
import Card from '../Card/Card';
import style from './Cards.module.css'

export default function Cards() {
    const dispatch = useDispatch();
    //almacena la data de todos los dogs!!
    const dogs = useSelector(state => state.dogs);
    //cantidad de dogs que se mostraran por pagina
    const dogsPerPage = 8;
    //estado local donde se almacena la pagina actual
    const [currentPage, setCurrentPage] = useState(1);
    //usamos un dispatch para tomar todos los dogs
    const temperaments = useSelector((state) => state.temperament);
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

    useEffect(() => {
        dispatch(getAllTemperaments());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllDogs());
    }, [dispatch]);
    useEffect(() => {
        handleFilterByTemperaments();
    }, [selectedTemperaments]);
    //añadimos al estado local todos los dogs
    //indexcacion y renderizado
    const startIndex = (currentPage - 1) * dogsPerPage;
    const endIndex = startIndex + dogsPerPage;
    const dogsToShow = dogs.slice(startIndex, endIndex);
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
    const handleFilterByTemperaments = () => {
        dispatch(filterDogsByTemperaments(selectedTemperaments));
    };
    //ordenamiento 
    const handleOrderChange = (order) => {
        dispatch(orderDogs(order));
    };
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
                {Array.from({ length: Math.ceil(( dogs.length) / dogsPerPage) }, (_, index) => (
                    <button
                        key={`page-${index + 1}`}
                        onClick={() => setCurrentPage(index + 1)}
                        style={{ margin: '5px', padding: '5px' }}
                    >
                        {index + 1}
                    </button>
                ))
                }
            </div>
        </div>
    );
}