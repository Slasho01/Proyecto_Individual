import style from './Search.module.css'
import { useState } from 'react';
export default function SearchBar(props) {
    const [dogs, dogSet] = useState('');
    const handleDogs = (evento) => {
        let { value } = evento.target;
        dogSet(value);
    };
    const handleClick = () =>{
            props.onSearch(dogs);
    }
    return (  
        <div className={style.SearchBar}>
            <input className={style.input} type='search' onChange={handleDogs}/>
            <button onClick={handleClick}>Search</button>
        </div>
    )
}