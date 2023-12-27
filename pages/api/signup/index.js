import {connect} from "../../database/dbConfig"
import User from "../../database/models"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

export async function POST(){
    connect()
    try{
            const reqBody = await NextRequest.json();
            const{username,email,password,dept,level,semester,matno} = reqBody
           const user = await User.findOne({email:email})
// check if user email exists
            if(user){
                return NextResponse.json({message:"User Email already exists"}, {status:400})
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
                matno:matno

             })
            await newUser.save();

            return NextResponse.json({message:"User created", userData:newUser}, {status:200})

             
    }
    catch(error){
            return NextResponse.json({error:error.message}, {status:500})
    }
}