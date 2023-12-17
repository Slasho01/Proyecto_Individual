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
    const {name} = req.query
    try {
        const respuesta = await axios.get(`${URLs}${name}`)
        const data = respuesta.data;
        for(let key in data){
            const { reference_image_id } = data[key]
            const imageU = await axios(`${URLi}${reference_image_id}?api_key=${APIKEY}`);
            const image = imageU.data.url;
            data[key].image = image
        }
        const respuestadb = await Dog.findAll({
            include: [{ model: Temperament, attributes: ['name'] }],
            where: {
              name: {
                [Op.like]: `%${name}%`,
              },
            },
          });
        const dog = respuestadb.map((dbdog) => {
            const { id, name, image, height, weight, life_span, temperaments } = dbdog.toJSON();
            const temperamentos = temperaments.map((temperament) => temperament.name).join(', ');
            return { id, name, image, height, weight, life_span, temperamentos }
        })
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