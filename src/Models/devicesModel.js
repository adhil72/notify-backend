import {v4 as uuidv4} from 'uuid';
import {Schema, model} from 'mongoose';

const addDeviceRequestSchema = new Schema({
    _id: {type: String, default: uuidv4},
    expiry: {type: Date, default: Date.now},
    userId: {type: String, required: true}
})

const addDeviceRequestModel = new model("addDeviceRequests", addDeviceRequestSchema)

export {addDeviceRequestModel}