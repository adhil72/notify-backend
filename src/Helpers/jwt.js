import jwt from "jsonwebtoken";
import {JwtSecret} from "./env.js";

const verify = (token) => {
    return new Promise((r, j) => {
        jwt.verify(token, JwtSecret(), {}, (err, data) => {
            if (err) return j(err)
            r(data)
        })
    })
}

const sign = (payload) => {
    return new Promise((r, j) => {
        jwt.sign(payload, JwtSecret(), {}, (err, token) => {
            if (err) return j(err)
            r(token)
        })
    })
}

export {sign, verify}