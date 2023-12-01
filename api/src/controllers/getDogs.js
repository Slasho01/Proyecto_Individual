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
    const id = req.params.id
    try {
        const response = await axios(`${URL}/${id}?api_key=${APIKEY}`)
        const data = response.data;
        const tempsList = []
        if (!data || Object.keys(data).length === 0) {
            const dbDog = await Dog.findByPk(id,
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
        } else {
            const { id, name, height, weight, life_span, reference_image_id, temperament } = data;
            const imageU = await axios(`${URLi}${reference_image_id}?api_key=${APIKEY}`);
            const image = imageU.data.url;
            const dogs = { id, name, height, weight, life_span, image, temperament };
            return dogs.name ? res.status(200).json(dogs) : res.status(404).send("Not found.")
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
        const { image, name, height, weight, life_span, temperament } = req.body
        if (!image || !name || !height || !weight || !life_span) return res.status(401).json({ error: 'Faltan Datos' })
        const [existOrNot, create] = await Dog.findOrCreate({ where: { name }, defaults: { image, height, weight, life_span } });
        if (temperament) {
            const tem = temperament.split(',').map(item => item.trim());
            const addTem = await Temperament.findAll({
                where: { name: tem }
            })
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