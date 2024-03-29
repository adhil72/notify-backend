import { sendFcm } from "../Helpers/Fcm.js";
import { addDeviceRequestModel, deviceModel } from "../Models/devicesModel.js";
import { messagesModel } from "../Models/messagesModel.js";
import { userModel } from "../Models/usersModel.js";
import { sign } from "../Helpers/jwt.js"

export const addDeviceRequestController = async ({ _id }) => {
    try {
        let expiry = new Date().getTime() + 10 * 60 * 1000
        let data = await new addDeviceRequestModel({ userId: _id, expiry }).save()
        return data._id
    } catch (e) {
        throw e
    }
}

export const getAllDeviceController = async ({ _id }) => {
    try {
        return await deviceModel.find({ user: _id })
    } catch (error) {
        throw error
    }
}

export const validateDeviceRequestController = async ({ _id, name, token, uid }) => {
    try {
        let request = await addDeviceRequestModel.findById(_id)
        if (!request) return new Error("Invalid request")

        if (new Date(request.expiry).getTime() - new Date().getTime() < 0) {
            await addDeviceRequestModel.findByIdAndDelete(_id)
            throw new Error("request expired")
        } else {
            await addDeviceRequestModel.findByIdAndDelete(_id)
            await deviceModel.findOneAndDelete({ uid })
            let deviceData = await new deviceModel({ name, token, user: request.userId, uid }).save()
            let jwtToken = await sign({ _id: deviceData._id, user: deviceData.user })
            return { _id: deviceData._id, token: jwtToken }
        }
    } catch (e) {
        throw e
    }
}

export const sendMessageController = async ({ message, to }, { _id }) => {
    try {
        let device = await deviceModel.find({ user: _id })
        let messages = await messagesModel.find({ user: _id })
        if (messages.length > 20) messagesModel.findOneAndDelete({ user: _id })
        await sendFcm({ token: device[0].token, data: { message, to } });
        let user = await userModel.findById(_id);
        if (new Date(user.messagesSendToday.lastUpdated).getDate() === new Date().getDate()) user.messagesSendToday.count = user.messagesSendToday.count + 1
        if (new Date(user.messagesSendMonth.lastUpdated).getMonth() === new Date().getMonth()) user.messagesSendMonth.count = user.messagesSendMonth.count + 1
        await user.save()
        return await new messagesModel({ message, user: _id, to }).save()
    } catch (error) {
        throw error
    }
}

export const getMessagesController = async ({ _id }) => {
    try {
        return await messagesModel.find({ user: _id })
    } catch (error) {
        throw error
    }
}

export const updateMessagesController = async ({ token }, { _id, user }) => {
    try {
        await deviceModel.findByIdAndUpdate(_id, { token })
        return {}
    } catch (error) {
        throw error
    }
}

export const disconnectDeviceController = async ({ _id, user }) => {
    await deviceModel.findByIdAndDelete(_id)
    return { message: "disconnected" }
}

