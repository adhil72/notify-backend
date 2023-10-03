import { addDeviceRequestModel, deviceModel } from "../Models/devicesModel.js";
import { userModel } from "../Models/usersModel.js";

const addDeviceRequestController = async ({ _id }) => {
    try {
        let expiry = new Date().getTime() + 10 * 60 * 1000
        let data = await new addDeviceRequestModel({ userId: _id, expiry }).save()
        return data._id
    } catch (e) {
        throw e
    }
}

const getAllDeviceController = async ({ _id }) => {
    try {
        return await deviceModel.find({ user: _id })
    } catch (error) {
        throw error
    }
}

const validateDeviceRequestController = async ({ _id, name, token, uid }) => {
    try {
        let request = await addDeviceRequestModel.findById(_id)
        if (!request) return new Error("Invalid request")

        if (new Date(request.expiry).getTime() - new Date().getTime() < 0) {
            await addDeviceRequestModel.findByIdAndDelete(_id)
            throw new Error("request expired")
        } else {
            await addDeviceRequestModel.findByIdAndDelete(_id)
            let idSearch = await deviceModel.findOne({ uid })
            if (idSearch) return { _id: idSearch._id }
            idSearch = await new deviceModel({ name, token, user: request.userId, uid }).save()
            return { _id: idSearch._id }
        }
    } catch (e) {
        console.log(e);
        throw e
    }
}

export { addDeviceRequestController, validateDeviceRequestController, getAllDeviceController }