import {connect} from "../../../database/dbConfig"
import User from "../../../database/models"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

export async function signup(NextRequest,NextResponse){
    connect()
    try{
            const reqBody = await NextRequest.json();
            const{email,course,time,venue} = reqBody
           const user = await User.findOne({email:email})
// check if user email exists
            if(user){
                const updateUser = await User.findOneAndUpdate({email:email},{$push:{"course":{course,time,venue}}})

                await User.save();

                return NextResponse.json({mesaage:"Course uploaded", Course:updateUser }, {status:200})
            }

            else{
                    return NextResponse.json({message:"User not valid",}, {status:400})
            }

            // hash password
            
               


             
    }
    catch(error){
            return NextResponse.json({error:error.message}, {status:500})
    }
}

export async function GET(){
    connect()
    try{
            const reqBody = await NextRequest.json();
            const{email} = reqBody
           const user = await User.findOne({email:email})
// check if user email exists
            if(user){
                const updateUser = await User.findOneAndUpdate({email:email},{$push:{"course":{course,time}}})
            }

            // hash password0
            
               


             
    }
    catch(error){
            return NextResponse.json({error:error.message}, {status:500})
    }



}