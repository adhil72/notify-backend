import { v4 as uuidv4 } from 'uuid';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    username: { type: String, default: '' },
    email: { type: String, required: true },
    password: { type: String, default: 'initial' },
    name: { type: String, default: 'user' },
    lastAccess: { type: Date, default: Date.now }
})

const userModel = model('users', userSchema)
export { userModel }
