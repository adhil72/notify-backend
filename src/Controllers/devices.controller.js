import {addDeviceRequestModel} from "../Models/devicesModel.js";

const addDeviceRequestController = async ({_id}) => {
    try {
        let expiry = new Date().getTime() + 10*60*1000
        let data = await new addDeviceRequestModel({userId: _id,expiry}).save()
        return data._id
    } catch (e) {
        throw e
    }
}

const validateDeviceRequestController = async ({_id}) => {
    try {
        let request = await addDeviceRequestModel.findById(_id)
        if (new Date(request.expiry).getTime() - new Date().getTime() < 0) {
            await addDeviceRequestModel.findByIdAndDelete(_id)
            throw new Error("request expired")
        } else {
            //Add to devices model
        }
    } catch (e) {
        throw e
    }
}

export {addDeviceRequestController, validateDeviceRequestController}