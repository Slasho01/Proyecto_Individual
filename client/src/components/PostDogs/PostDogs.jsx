import style from '../PostDogs/PostDogs.module.css'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTemperaments } from '../../redux/actions/actions'
const PostDogs = (props) => {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperament);
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    useEffect(() => {
        dispatch(getAllTemperaments());
    }, [dispatch]);

    const handleSelectChange = (event) => {
        const selectedName = event.target.options[event.target.selectedIndex].text;
        if (!selectedTemperaments.includes(selectedName) && selectedTemperaments.length < 5) {
            setSelectedTemperaments([...selectedTemperaments, selectedName]);
        }
    };

    const handleRemoveTemperament = (selectedName) => {
        const indexARemover = selectedTemperaments.indexOf(selectedName);

        if (indexARemover !== -1) {
            const actualizarTemperamento = [
                ...selectedTemperaments.slice(0, indexARemover),
                ...selectedTemperaments.slice(indexARemover + 1),
            ];
               console.log(actualizarTemperamento)
            setSelectedTemperaments(actualizarTemperamento);
        }
        };
        return (
            <div>
                <h2>Añadir Raza</h2>
                <form className={style.container} onSubmit={null}>
                    <label>name: </label>
                    <input type="text" name='name' />
                    <label>height: </label>
                    <input type="text" name='height' />
                    <label>weight: </label>
                    <input type="text" name='weight' />
                    <label>life_span: </label>
                    <input type="text" name='life_span' />
                    <label>temperament: </label>
                    <select onChange={handleSelectChange}>
                        {temperaments.map((temperament) => (
                            <option key={temperament.id} value={temperament.id}>
                                {temperament.name}
                            </option>
                        ))}
                    </select>
                    <div>
                        <h2>Temperamentos seleccionados:</h2>
                        <ul name='temperament'>
                            {selectedTemperaments.map((selected) => (
                                <label className={style.listTem} key={selected}>
                                    {selected}
                                    <button className={style.buttonDel} onClick={() => handleRemoveTemperament(selected)}>
                                        X
                                    </button>
                                </label>
                            ))}
                        </ul>
                    </div>

                    <button>Registrar</button>
                </form>
            </div>
        )
    }
    export default PostDogs;