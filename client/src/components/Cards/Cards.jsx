import Card from '../Card/Card';

export default function Cards(props) {
    const { dogs } = props;
    return (
        <div>{
            dogs.map(dog => {
                <Card
                    id={dog.id}
                    name={dog.name}
                    height={dog.height}
                    weight={dog.weight}
                    life_span={props.life_span}
                    image={props.image}
                />
            })
        }</div>
    )
}