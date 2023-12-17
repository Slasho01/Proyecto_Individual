import style from './Search.module.css'
import { useState, useEffect } from 'react';
export default function SearchBar(props) {
    const [dogs, dogSet] = useState('');
    const handleCharacter = (evento) => {
        let { value } = evento.target;
        dogSet(value);
    };
    const handleClick = () =>{
        props.onSearch(dogs);
    }
    return (  
        <div className={style.SearchBar}>
            <input className={style.input} type='search' onChange={handleCharacter}/>
            <button onClick={handleClick}>Search</button>
        </div>
    )
}