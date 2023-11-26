import style from './Search.module.css'
import { useState } from 'react';
export default function SearchBar(props) {
    const [characters, characterSet] = useState(0);
    const handleCharacter = (evento) => {
        let { value } = evento.target;
        characterSet(value);
      }
    const rand = () => {
        return Math.ceil(Math.random()*826);
     }
    return (  
        <div className={style.SearchBar}>
            <input className={style.input} type='search' onChange={handleCharacter} />
            <button className={style.button} onClick={() => props.onSearch(characters)}>Agregar</button>
            <button className={style.button} onClick={() => props.onSearch(rand())}>Random</button>
        </div>
    )
}