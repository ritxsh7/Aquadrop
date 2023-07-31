import axios from 'axios';

const URL = 'https://localhost:8080'

export const authenticateSignUp = async(data) => {
    try{
        return await axios.post(`${URL}/signup`, data);
    }catch(error)
    {
        console.log("Error while Signing up ",  error)
    }
}