import style from "./Card.module.css";
const Card = (props)=>{

    return(
        <div>
            <h2>Identificador: {props.id}</h2>
            <h2>Raza: {props.name}</h2>
            <h2>Altura: {props.height}</h2>
            <h2>Peso: {props.weight}</h2>
            <h2>Años de vida: {props.life_span}</h2>
            <img className={style.image} src={props.image} alt={props.id} />
        </div>
    )
}
export default Card