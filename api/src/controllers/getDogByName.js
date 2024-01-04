require('dotenv').config();
const { Dog, Temperament } = require('../db')
const axios = require("axios");
const { Op } = require('sequelize');
const URLs = 'https://api.thedogapi.com/v1/breeds/search?q='
const URLi = 'https://api.thedogapi.com/v1/images/'
const {
    APIKEY
} = process.env;
const getDogsByName = async (req, res) => {
    const { name } = req.query
    try {
        const respuesta = await axios.get(`${URLs}${name}`)
        const data = respuesta.data;
        for(let key in data){
            const { reference_image_id } = data[key]
            const imageU = await axios(`${URLi}${reference_image_id}?api_key=${APIKEY}`);
            const image = imageU.data.url;
            data[key].image = image
        }
        //buscamos en la db con el find all
        const respuestadb = await Dog.findAll({
            //include: incluimos los temperamentos por el atributo name
            include: [{ model: Temperament, attributes: ['name'] }],
            //buscamos el perro encontrado segun lo ingresado con el like que toma el valor y lo busca segun lo ingresado 
            //y añadimos la I a ilike para que ignore las mayosculas y o minusculas
            where: {
              name: {
                [Op.iLike]: `%${name}%`,
              },
            },
          });
          //usamos map para tomar la data que solo necesitamos mostrar y la convertimos a formato json
        const dog = respuestadb.map((dbdog) => {
            const { id, name, image, height, weight, life_span, temperaments } = dbdog.toJSON();
            //usamos un mapeo y pasamos de un array de objetos a un array simple con un join para que sea mas legible la informacion
            //y mostrarla tal cual la api
            const temperamentos = temperaments.map((temperament) => temperament.name).join(', ');
            return { id, name, image, height, weight, life_span, temperamentos }
        })
        //combinamos la info de la api + la db para mostrarla
        const combine = data.concat(...dog)
        if(combine.length > 0){
            res.status(201).json(combine)
        }else{
            res.status(404).json('No exite')
        }
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}
module.exports = {
    getDogsByName
};