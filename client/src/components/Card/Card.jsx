import style from "./Card.module.css";
import { Link } from "react-router-dom";
const Card = (props) => {
    return (
            <Link
                to={`/dogs/${props.id}`}
                style={{ textDecoration: "none", color: "white" }}
            >
                <div className={style.container}>
                    <img className={style.image} src={props.image} alt={props.id} />
                    <h2 className={style.text}>{props.name}</h2>
                    <h2 className={style.text}>Temperamento: {props.temperament}</h2>
                    {props.weight && (
                    <>
                        <h2 className={style.text}>Peso (Imperial): {props.weight.imperial}</h2>
                        <h2 className={style.text}>Peso (Metric): {props.weight.metric}</h2>
                    </>
                )}
                </div>
            </Link>
    )
}
export default Card