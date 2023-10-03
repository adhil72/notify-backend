import { v4 as uuidv4 } from 'uuid';
import { Schema, model } from 'mongoose';

const addDeviceRequestSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    expiry: { type: Date, default: Date.now },
    userId: { type: String, required: true }
})

const deviceSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    token: { type: String, default: "" },
    user: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    uid: { type: String, required: true }
})

const addDeviceRequestModel = new model("addDeviceRequests", addDeviceRequestSchema)
const deviceModel = new model("devices", deviceSchema)
export { addDeviceRequestModel, deviceModel }