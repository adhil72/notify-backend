import {config} from 'dotenv';

config()

const JwtSecret = () => {
    return extractValue("JWT_SECRET", true)
}

export {JwtSecret}

function extractValue(token, required) {
    let value = process.env[token]
    if (value) {
        return value
    } else {
        if (required) {
            throw new Error("required token not found : " + token)
        } else {
            return ''
        }
    }
}