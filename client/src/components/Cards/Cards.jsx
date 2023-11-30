import Card from '../Card/Card';

export default function Cards(props) {
    const { dogs } = props;
    return (
        <div>{
            dogs.map(dog => (
                <Card
                    key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    height={dog.height}
                    weight={dog.weight}
                    life_span={dog.life_span}
                    temperament={dog.temperament || dog.temperamentos}
                    image={dog.image}
                />
            ))
        }</div>
    )
}