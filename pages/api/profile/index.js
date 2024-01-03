import {connect} from "../../../database/dbConfig"
import User from "../../../database/models"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"


export async function GET(NextRequest,NextResponse){
connect()
const reqBody = await NextRequest.json();
            const{email} = reqBody
           const user = await User.findOne({email:email});
           if(user){
            return NextResponse.json({ userData:user}, {status:200})
           }
           else{
            return NextResponse.json({message:"User not valid"}, {status:400})
           }

}