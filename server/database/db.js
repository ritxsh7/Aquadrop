import mongoose from "mongoose"

const Connection = async() =>{
    const URL = 'mongodb+srv://pbl:pavbhajilegends@water-delivery-website.vp19zvk.mongodb.net/?retryWrites=true&w=majority'
    try{
        await mongoose.connect(URL, {useUnifiedTopology : true, useNewUrlParser: true})
        console.log('Database connected successfully')
    }catch(error){
        console.log('Error while connecting to server ', error.message)
    }
}

export default Connection;