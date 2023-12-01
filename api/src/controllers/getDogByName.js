require('dotenv').config();
const { Dog, Temperament } = require('../db')
const axios = require("axios");
const URLs = 'https://api.thedogapi.com/v1/breeds/search?q='
const getDogsByName = async (req, res) => {
    const {name} = req.query
    try {
        console.log(name)
        const respuesta = await axios.get(`${URLs}${name}`)
        const data = respuesta.data;
        if(data.length > 0){
            res.status(201).json(data)
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