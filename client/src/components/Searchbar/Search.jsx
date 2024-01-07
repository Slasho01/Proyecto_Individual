import style from './Search.module.css'
import { useState } from 'react';
export default function SearchBar(props) {
    const [dog, dogSet] = useState('');
    const handleChange = (event) => {
        dogSet(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleClick();
            handleClear();
        }
    };

    const handleClick = () => {
        props.onSearch(dog);
    };

    const handleClear = () => {
        dogSet('');
    };
    return (
        <div className={style.SearchBar}>
            <input
                className={style.input}
                type='dog'
                value={dog}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            <button className={style.botun} onClick={handleClick}>Search</button>
        </div>
    )
}