import { v4 as uuidv4 } from 'uuid';
import { Schema, model } from 'mongoose';

const cardSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const cardModel = new model('cardModel', cardSchema)
export { cardModel }