import { updateMessagesController } from "../../Controllers/devices.controller.js"
import ResponseModel from "../../Constants/ResponseModel.js"

export default {
    mode: 'post', fun: async (req, res) => {
        let response = await updateMessagesController(req.body,req.user)
            .then((data) => ResponseModel("device updated", data, false))
            .catch((err) => ResponseModel(err.message, null, true))
        res.status(response.failed ? 400 : 200).send(response)
    }
};