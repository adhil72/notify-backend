import { cardModel } from "../Models/cardsModel.js"

const createCard = async (body) => {
    try {
        return await new cardModel(body).save()
    } catch (error) {
        throw error
    }
}

const updateCard = async (id, body) => {
    try {

    } catch (error) {
        console.log(error);
    }
}