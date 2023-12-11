import Card from '../Card/Card';
import React, { useState } from 'react';
export default function Cards(props) {
    const { dogs } = props;
    const dogsPerPage = 8
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * dogsPerPage;
    const endIndex = startIndex + dogsPerPage;
    const dogsToShow = dogs.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>{
            dogsToShow.map(dog => (
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
            ))
        }
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
            </div></div>
    )
}