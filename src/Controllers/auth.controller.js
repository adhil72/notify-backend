import { userModel } from "../Models/usersModel.js";
import jwt from "jsonwebtoken";
import { JwtSecret } from "../Helpers/env.js";
import { comparePassword, hashPassword } from "../Helpers/crypter.js";

const userLoginController = async (body) => {
    try {
        let { email } = body

        let search = await userModel.findOne({ email })
        search.lastAccess = new Date()
        await search.save()

        if (search) {
            if (await comparePassword(body.password, search.password)) {
                return new Promise((r, j) => {
                    jwt.sign({ _id: search._id, email: search.email }, JwtSecret(), {}, (err, token) => {
                        if (err) return j(err)
                        return r(token)
                    })
                })
            } else {
                throw new Error("Login error")
            }
        } else {
            let user = await new userModel({ email }).save()
            return new Promise((r, j) => {
                jwt.sign({ _id: user._id, email: user.email }, JwtSecret(), {}, (err, token) => {
                    if (err) return j(err)
                    return r(token)
                })
            })
        }

    } catch (e) {
        throw e
    }
}

const updatePasswordController = async (body, { _id }) => {
    try {
        let user = await userModel.findById(_id)
        user.password = await hashPassword(body.password)
        await user.save()
        return true
    } catch (e) {
        throw e
    }
}

const updateNameController = async (body, { _id }) => {
    try {
        if (!body.name) throw new Error("Error updating name")
        let user = await userModel.findById(_id)
        user.name = body.name
        user.lastAccess = new Date()
        await user.save()
        return true
    } catch (e) {
        throw e
    }
}

const updateUserNameController = async (body, { _id }) => {
    try {
        if (!body.username) throw new Error("Error updating username")
        let search = await userModel.findOne({ username: body.username })
        if (search) throw new Error("username already used")
        let user = await userModel.findById(_id)
        user.username = body.username
        user.lastAccess = new Date()
        await user.save()
        return true
    } catch (e) {
        throw e
    }
}

export { userLoginController, updatePasswordController, updateNameController, updateUserNameController }