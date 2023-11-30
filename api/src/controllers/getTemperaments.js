require('dotenv').config();
const { Temperament } = require('../db')
const axios = require("axios");
const URL = 'https://api.thedogapi.com/v1/breeds'
const {
    APIKEY
  } = process.env;

  async function getTemperament(req, res){
    try {
        const response = await axios.get(`${URL}?api_key=${APIKEY}`)
        const razas = response.data
        const tempsList = []
        razas.forEach((raza) => {
            const { temperament } = raza
            if(temperament){
                const combinarTem = temperament.split(',').map((temp) => temp.trim());
                tempsList.push(...combinarTem)
            }
        });
        const uniqueSet = new Set(tempsList);
        const arrayConvert = [...uniqueSet];
        if(!arrayConvert){
            await Temperament.bulkCreate(arrayConvert.map((name) => ({ name })));
        }else{
            const allTemperament = await Temperament.findAll();
            return res.status(201).json(allTemperament);

        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }
  module.exports = getTemperament;