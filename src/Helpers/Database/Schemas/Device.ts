import { randomId } from "../../Random"
import res from "../res"
import validator from "../validator"
import { Auth } from "./auth"

const generateAddToken = async ({ access }: { access: string }) => {
    let user = await Auth.findOne({ 'access.token': access })
    if (user) {
        if (validator(user.access)) {
            let token = randomId(40)
            user.clientRequests.push(token)
            await user.save()
            return { token, code: 200 }
        } else {
            return res.timeout
        }
    } else {
        return res.internelError
    }
}

const validateAddToken = async ({ access, token, phone }: { access: object, token: string, phone: { name: string, token: string } }) => {
    let user = await Auth.findOne({ 'access.token': token })
    if (user) {
        if (validator(user.access)) {
            if (user.clientRequests.includes(token)) {
                user.clients.push(phone)
                user.clientRequests.filter((r) => { return r != token })
                await user.save()
                return res.success('New Device added')
            } else {
                return res.internelError
            }
        } else {
            return res.timeout
        }
    } else {
        return res.internelError
    }
}

const getAllDevice = async ({ access }: { access: object }) => {
    let user = await Auth.findOne({ 'access.token': access })
    if (user) {
        if (validator(user.access)) {
            return user.clients
        } else {
            return res.timeout
        }
    } else {
        return res.internelError
    }
}

export { validateAddToken, generateAddToken, getAllDevice }