import { Schema, model } from "mongoose";
import fetch from "../res";
import { hashSync } from "bcryptjs"

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, default: '' },
    lastAccess: { type: String, required: true }
})

const Auth = model('Auth', userSchema)

const findUser = async (email: string) => {
    let user = await Auth.findOne({ email })
    return user
}



const updatePassword = async (props: { id: string, password: string }) => {
    const user = await Auth.findById(props.id);
    if (user && props.password) {
        if (props.password.length < 6)
            return fetch.internelError
        let enc_pwd = hashSync(props.password, 10)
        user.password = enc_pwd
        user.lastAccess = new Date().toString()
        return fetch.success('Password updated')
    } else {
        return fetch.internelError
    }

}

export { Auth, findUser, updatePassword }