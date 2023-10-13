import ResponseModel from "../../../Constants/ResponseModel.js"
import { getMessagesController } from "../../../Controllers/devices.controller.js"

export default {
    mode: 'get', fun: async (req, res) => {
        console.log(req.body);
        let response = await getMessagesController(req.user)
            .then((data) => ResponseModel("sms fetched", data, false))
            .catch((err) => ResponseModel(err.message, null, true))
        res.status(response.failed ? 400 : 200).send(response)
    }
}