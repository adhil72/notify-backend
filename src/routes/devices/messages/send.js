import ResponseModel from "../../../Constants/ResponseModel.js"
import { sendMessageController } from "../../../Controllers/devices.controller.js"

export default {
    mode: 'post', fun: async (req, res) => {
        let response = await sendMessageController(req.body, req.user)
            .then((data) => ResponseModel("sms send", data, false))
            .catch((err) => ResponseModel(err.message, null, true))
        res.status(response.failed ? 400 : 200).send(response)
    }
}