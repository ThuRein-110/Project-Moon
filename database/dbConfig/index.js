import mongoose from "mongoose"
import {NextApiRequest, NextApiResponse} from "next"


export async function connect(){

  
    try{
     
  await mongoose.connect('mongodb+srv://scheduler:sheduler@cluster0.dbyr2a8.mongodb.net/',{
    useNewUrlParser:true,useUnifiedTopology:true
  }
  )
  
    }

    catch(error){
            console.log("Something goes wrong")
    }
}