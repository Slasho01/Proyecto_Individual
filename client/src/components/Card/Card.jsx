import style from "./Card.module.css";
const Card = (props)=>{
    return(
        <div className={style.container}>
            <img className={style.image} src={props.image} alt={props.id} />
            <h2>Raza: {props.name}</h2>
            <h2>Temperamento: {props.temperament}</h2>
            <h2>Peso (Imperial) : {props.weight.imperial}</h2>
            <h2>Peso (Metric): {props.weight.metric}</h2>
        </div>
    )
}
export default Card