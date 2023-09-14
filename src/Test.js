import {JwtSecret} from "./Helpers/env.js";
import jwt from "jsonwebtoken";

jwt.sign({name:'adhil'},JwtSecret(),{},(err,token)=>{
    console.log(token,err)
})