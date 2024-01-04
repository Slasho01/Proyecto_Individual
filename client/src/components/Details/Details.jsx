import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getDogById, limpiarDogs } from "../../redux/actions/actions";
import style from '../Details/Details.module.css'
export default function Details() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const dog = useSelector(state => state.detail);
    useEffect(() => {
        dispatch(limpiarDogs())
    }, [dispatch, id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getDogById(id));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dispatch, id]);
    return (
        <div className={style.container}>
            <div className={style.card}>
                <button className={style.buton}> <Link className={style.botun} to='/home'>BACK</Link></button>
                <div className={style.imageStyle}>
                    <img className={style.imgcon} src={dog?.image} alt={dog?.id} />
                </div>
                <p className={style.dates}>
                    <p className={style.h2}>Id: {dog?.id}</p>
                    <p className={style.h2}>Raza: {dog?.name}</p>
                    <p className={style.h2}>Altura: {dog?.height ? `Imperial: ${dog.height.imperial}, Metric: ${dog.height.metric}` : 'No disponible'}</p>
                    <p className={style.h2}>Peso: {dog?.weight ? `Imperial: ${dog.weight.imperial}, Metric: ${dog.weight.metric}` : 'No disponible'}</p>
                    <p className={style.h2}>Temperamento: {dog?.temperament || dog?.temperamentos}</p>
                    <p className={style.h2}>Años de vida: {dog?.life_span}</p>
                </p>
            </div>
        </div>
    )
}
