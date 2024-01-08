import {connect} from "../../../database/dbConfig"
import User from "../../../database/models"
import { NextApiRequest,NextApiResponse } from "next"
import bcryptjs from "bcryptjs"

export default async function signup(NextApiRequest,NextApiResponse){
    await connect()
    try{
            const reqBody = NextApiRequest.body;
            const{username,email,password,dept,level,semester,matno,phone} = reqBody
           const user = User.findOne({email:email});
// check if user email exists
            if(user == true){
                return NextApiResponse.json({message:"User Email already exists"}, {status:400})
            }

            // hash password
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password,salt)

            // create new user
           const newUser =   new User({
                name:username,
                email: email,
                password:hashedPassword,
                dept:dept,
                level:level,
                semester:semester,
                matno:matno,
                phoneNo:phone

             })
            await newUser.save();

            return NextApiResponse.json({message:"User created", userData:newUser}, {status:200})

             
    }
    catch(error){
            return NextApiResponse.json({error:error.message}, {status:500})
    }
}