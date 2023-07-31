import axios from 'axios';

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://distanceto.p.rapidapi.com/get',
  params: {
    route: '<REQUIRED>',
    car: 'false'
  },
  host: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'https://www.google.com/maps/dir/18.6220514,73.8176062/PCMC+%E0%A4%AA%E0%A5%80%E0%A4%B8%E0%A5%80%E0%A4%8F%E0%A4%AE%E0%A4%B8%E0%A5%80/@18.6220333,73.8175987,20.21z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3bc2b84e2c31d847:0x1f969a1741809589!2m2!1d73.803354!2d18.629375?entry=ttu'
  }
};

const location = ({host:{dropper}})=>{
    return(dropper.target.value);
}

export default location;

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}