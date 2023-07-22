import { Schema, model } from "mongoose";
import fetch from "../res";
import { hashSync } from "bcryptjs"
import { randomInt } from "../../Random";
import { send } from "../../Gmail/Gmail";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, default: '' },
    lastAccess: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
    name: { type: String, default: 'user' },
    code: { type: String, default: "000000" }
})

const Auth = model('Auth', userSchema)

const findUser = async (email: string) => {
    let user = await Auth.findOne({ email })
    return user
}

const createVerification = async (id: string) => {
    const user = await Auth.findById(id);
    if (user) {
        user.code = randomInt(100000, 999999).toFixed()
        user.lastAccess = new Date().toString()
        await send({ to: user.email, message: 'Your verification code : ' + user.code, subject: 'OTP' })
        await user.save()
        return fetch.success('verification created')
    } else {
        return fetch.internelError
    }
}

const confirmVerification = async (props: { id: string, code: string }) => {
    const user = await Auth.findById(props.id);
    if (user) {
        if (new Date().getTime() - new Date(user.lastAccess).getTime() > 1000 * 60 * 5)
            return fetch.timeout

        if (user.code == props.code) {
            user.code = "000000"
            user.verified = true
            await user.save()
            return fetch.success('verified')
        } else {
            return fetch.error('code does not match')
        }

    } else {
        return fetch.internelError
    }
}

const updatePassword = async (props: { id: string, password: string }) => {
    const user = await Auth.findById(props.id);
    if (user && props.password) {
        if (props.password.length < 6)
            return fetch.internelError

        if (new Date().getTime() - new Date(user.lastAccess).getTime() > 1000 * 60 * 5)
            return fetch.timeout

        let enc_pwd = hashSync(props.password, 10)
        user.password = enc_pwd
        user.lastAccess = new Date().toString()
        await user.save()
        return fetch.success('Password updated')
    } else {
        return fetch.internelError
    }

}

export { Auth, findUser, updatePassword, createVerification, confirmVerification }