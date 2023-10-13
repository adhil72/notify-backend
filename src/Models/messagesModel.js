import { v4 as uuidv4 } from 'uuid';
import { Schema, model } from 'mongoose';

const messagesSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    message: { type: String, required: true },
    user: { type: String, required: true },
    to:{type:String,required:true}
})

const messagesModel = model('messages', messagesSchema)
export { messagesModel }

