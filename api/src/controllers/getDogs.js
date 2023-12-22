//Requerimos los modelos y el componente axios
require('dotenv').config();
const { Dog, Temperament } = require('../db')
const axios = require("axios");
const URL = 'https://api.thedogapi.com/v1/breeds'
const URLi = 'https://api.thedogapi.com/v1/images/'
const {
    APIKEY
} = process.env;
//Funcion asincrona para obtener los "Dogs"
async function getDogs(req, res) {
    try {
        /*
         * Declaramos la constante Response 
         * y se hace un get a la api para traer todos los perros 
         * y lo asignaos a la constante
         */
        const response = await axios.get(`${URL}?api_key=${APIKEY}`)
        //se asigna la data almacenada en response.data a la constante data
        const data = response.data;
        //usamos un condicional para validar si esta vacio o si hay informacion en data
        if (!data || data.length === 0) {
            return res.status(404).send("Not found.");
        } else {
            /** Datos de la API **/
            //recorremos data y asignamos a la variable dogs cada objeto encontrado
            const dogs = data.map(dogo => {
                const { id, image, name, height, weight, temperament, life_span } = dogo;
                //retornamos los perros que se asignaran a dogs
                return { id, image: image.url, name, height, weight, temperament, life_span };
            });
            /** Datos de la base de datos **/
            //asignamos a la constante getDbd todos los perros encontrados en la tabla Dog"Modelo" 
            const getDbd = await Dog.findAll(
                { include: [{ model: Temperament, attributes: ['name'] }], }
            );
            const dog = getDbd.map((dbdog) => {
                const { id, name, image, height, weight, life_span, temperaments } = dbdog.toJSON();
                const temperamentos = temperaments.map((temperament) => temperament.name).join(', ');
                return { id, name, image, height, weight, life_span, temperamentos }
            })
            //Combinamos los perros encontrados de la api, mas los encontrados en la base de datos en la constante
            //"combined" para despues retornarla con el status
            const combined = [...dogs, ...dog]
            return res.status(200).json(combined);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getDogsById(req, res) {
    const ids = req.params.id
    try {
        if(ids.length <=3){
            const response = await axios(`${URL}/${ids}?api_key=${APIKEY}`)
            const data = response.data;
            const { id, name, height, weight, life_span, reference_image_id, temperament } = data;
            const imageU = await axios(`${URLi}${reference_image_id}?api_key=${APIKEY}`);
            const image = imageU.data.url;
            const dogs = { id, name, height, weight, life_span, image, temperament };
            return dogs.name ? res.status(200).json(dogs) : res.status(404).send("Not found.")
        }else{
            const dbDog = await Dog.findByPk(ids,
                {
                    include: [{
                        model: Temperament,
                        attributes: ['name'],
                        through: { attributes: [] }
                    }]
                })
            if (dbDog) {
                const { id, image, name, height, weight, life_span, temperaments } = dbDog.toJSON();
                const temperamentos = temperaments.map(temperament => temperament.name).join(', ');
                const dog = { id, name, image, height, weight, life_span, temperamentos };
                return res.status(200).json(dog);
            } else {
                return res.status(404).send("Not found.");
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/*
 *
 *
 * Post Dog 
 * 
 * 
 */
const postDog = async (req, res) => {
    try {
        //Desestructuring de los datos requeridos por parametros
        const { image, name, height, weight, life_span, temperament } = req.body
        //Verificamos si alguno de los datos requeridos por parametros esta vacio
        if (!image || !name || !height || !weight || !life_span) return res.status(401).json({ error: 'Faltan Datos' })
        //Buscamos o creamos, dependiendo si existOrNot devuelve true, quiere decir que ya hay un dog con ese name
        //si devuelve false creamos el dog nuevo
        const [existOrNot, create] = await Dog.findOrCreate({ where: { name }, defaults: { image, height, weight, life_span } });
        //Verificamos que los temperamentos estan con un if
        if (temperament) {
            //recorremos los temperamentos y pasamos de esto Stubborn, Curious, Playful, Adventurous, Aloof
            //a esto [ 'Stubborn', 'Curious', 'Playful', 'Adventurous', 'Aloof' ] usando un split y un map para recorrer cada valor
            const tem = temperament.split(',').map(item => item.trim());
            //buscamos los temperamentos en nuestra tabla de temperamentos de nuestra base de datos
            const addTem = await Temperament.findAll({
                //buscamos los temperamentos guardados en la variable tem en la db y asignamos a addTem
                where: { name: tem }
            })
            //asignamos seteamos los temperamentos a la relacion "Leer un poco sobre la funcion"
            //setTemperaments que es una funcion que asigna sequelize si no mal recuerdo!!
            await existOrNot.setTemperaments(addTem);
        } else {
            return res.status(401).json({ error: 'No se pudo agregar ya que no existe' })
        }

        return res.status(201).json({ existOrNot, create });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getDogs,
    getDogsById,
    postDog,
};