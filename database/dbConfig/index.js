import mongoose from "mongoose"
import {NextRequest, NextResponse} from "next/server"

export async function connect(){
    try{
  mongoose.connect(process.env.MONGO_URL)
  const connection = await mongoose.connection;

  connection.on('connected', ()=>{
      console.log("MongoDb connected successfully")
  })

  connection.on('error',(err)=>{
      console.log("MongoDB is running", +err);
return NextResponse.json({message:"Server Error"}, {status:500});
      process.exit();
  })
    }

    catch(error){
            console.log("Something goes wrong")
    }
}