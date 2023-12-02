import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const URL = 'http://localhost:3001/dogs';
export default function Details() {
    const { id } = useParams();
    const [dog, setDogs] = useState({});
    console.log(id)
    useEffect(() => {
        const detailDog = async () => {
            try {
                const response = await axios(`${URL}/${id}`)
                const dogD = response.data
                console.log(dogD.name)
                if (dogD.name) {
                    setDogs(dogD);
                } else {
                    window.alert('No existe el ID')
                }
            } catch (error) {
                console.error("Error: ", error);
            }
        }
        detailDog();
    }, [id])

    return (
        <div>
            <button> <Link to='/home'>BACK</Link></button>
            <h2 >Id: {dog.id}</h2>
            <img src={dog.image} alt={dog.id} />
            <h2 >Raza: {dog.name}</h2>
            <h2 >Altura: {dog.height ? `Imperial: ${dog.height.imperial}, Metric: ${dog.height.metric}` : 'No disponible'}</h2>
            <h2>Peso: {dog.weight ? `Imperial: ${dog.weight.imperial}, Metric: ${dog.weight.metric}` : 'No disponible'}</h2>
            <h2 >Temperamento: {dog.temperament || dog.temperamentos}</h2>
            <h2>Años de vida: {dog.life_span}</h2>
        </div>
    )
}
