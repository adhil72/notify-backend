import { Schema, model } from "mongoose";
import fetch from "../res";
import { compareSync, hashSync } from "bcryptjs"
import { randomId, randomInt } from "../../Random";
import { send } from "../../Gmail/Gmail";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, default: '' },
    lastAccess: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
    name: { type: String, default: 'user' },
    code: { type: String, default: "000000" },
    access: { type: Object, default: { token: "", expiry: "" } }
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
        user.access = { token: randomId(30), expiry: new Date(new Date().getTime() + (1000 * 60 * 60 * 11 * 5)) }
        await user.save()
        return { code: 200, access: user.access }
    } else {
        return fetch.internelError
    }
}

const createToken = async (props: { id: string, passowrd: string }) => {
    const user = await Auth.findById(props.id);
    if (user) {
        if (new Date().getTime() - new Date(user.lastAccess).getTime() > 1000 * 60 * 5)
            return fetch.timeout

        if (!compareSync(props.passowrd, user.password))
            return fetch.error('An error occured while login in')

        user.lastAccess = new Date().toString()
        user.access = { token: randomId(30), expiry: new Date(new Date().getTime() + (1000 * 60 * 60 * 11 * 5)) }
        await user.save()
        return { code: 200, access: user.access }
    } else {
        return fetch.internelError
    }
}

export { Auth, findUser, updatePassword, createVerification, confirmVerification, createToken }