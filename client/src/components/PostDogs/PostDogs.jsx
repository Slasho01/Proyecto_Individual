import axios from 'axios';
import style from '../PostDogs/PostDogs.module.css'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTemperaments } from '../../redux/actions/actions'
const URL = 'http://localhost:3001/dogs/';
const PostDogs = () => {
    const dispatch = useDispatch();
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
    const onSubmit = async (event) => {
        //event.preventDefault();
        const enviar = {
            ...razaData,
            temperament: selectedTemperaments.join(', ')
        }
        console.log(enviar)
        try {
            if(enviar){
                axios.post(URL, enviar)
            }else{
                alert('no pueden haber campos vacios')
            }
        } catch (error) {
            console.alert(error)
        }
    }
    return (
        <div>
            <h2>Añadir Raza</h2>
            <form className={style.container}>
                <label className={style.labels}>Name: </label>
                <input type="text"  className={style.inputN} name='name' placeholder='Raza' onChange={handleInputChange} value={razaData.name} />
                <label className={style.labels} >Height:</label>
                <label className={style.labelsCointain}>
                    Imperial: <input className={style.inputs} placeholder="10 - 10" type="text" name='height.imperial' onChange={handleInputChange} value={razaData.height.imperial} />
                    Metric: <input className={style.inputs} placeholder="10 - 10" type="text" name='height.metric' onChange={handleInputChange} value={razaData.height.metric} />
                </label>
                <label className={style.labels}>Weight:</label>
                <label className={style.labelsCointain}>
                    Imperial: <input className={style.inputs} placeholder="10 - 10" type="text" name='weight.imperial' onChange={handleInputChange} value={razaData.weight.imperial} />
                    Metric: <input className={style.inputs} placeholder="10 - 10" type="text" name='weight.metric' onChange={handleInputChange} value={razaData.weight.metric} />
                </label>
                <label className={style.labelsCointain}>life_span: </label>
                <input type="text" className={style.inputN} name='life_span' placeholder="10 - 10" onChange={handleInputChange} value={razaData.life_span} />
                <label className={style.labelsCointain}>link de la imagen de la raza: </label>
                <input type="text"  className={style.inputN} name='image' placeholder="https://www.example.com/perro.img" onChange={handleInputChange} value={razaData.image} />
                <label className={style.labelsCointain}>temperament: </label>
                <select  className={style.inputN} onChange={handleSelectChange}>
                    {temperaments.map((temperament) => (
                        <option key={temperament.id} value={temperament.id}>
                            {temperament.name}
                        </option>
                    ))}
                </select>
                <div className={style.selectContains}>
                    <h2>Temperamentos seleccionados:</h2>
                    <ul name='temperament'>
                        {selectedTemperaments.map((selected) => (
                            <label className={style.listTem} key={selected} onChange={handleInputChange} onClick={() => handleRemoveTemperament(selected)}>
                                {selected}
                            </label>
                        ))}
                    </ul>
                </div>
            </form>
                <button  className={style.botton} type='submit' onClick={onSubmit}>Registrar</button>
        </div>
    )
}
export default PostDogs;