import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, orderDogs } from '../../redux/actions/actions';
import Card from '../Card/Card';

export default function Cards() {
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs);

    const dogsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getAllDogs());
    }, [dispatch]);
    const startIndex = (currentPage - 1) * dogsPerPage;
    const endIndex = startIndex + dogsPerPage;
    const dogsToShow = dogs.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleOrderChange = (order) => {
        dispatch(orderDogs(order));
    };

    return (

        <div>
            <div>
                <select className='SelectOrder' onChange={(e) => handleOrderChange(e.target.value)}>
                    <option value="A">A to Z</option>
                    <option value="D">Z to A</option>
                    <option value="B">Peso Max</option>
                    <option value="C">Peso Min</option>
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
                {Array.from({ length: Math.ceil(dogs.length / dogsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        style={{ margin: '5px', padding: '5px' }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}