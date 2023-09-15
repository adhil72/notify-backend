import {validateDeviceRequestController} from "../../../Controllers/devices.controller.js";
import ResponseModel from "../../../Constants/ResponseModel.js";

export default {
    mode: 'POST', fun: async (req, res) => {
        let response = await validateDeviceRequestController(req.body)
            .then((token) => ResponseModel("request approved created", null, false))
            .catch((err) => ResponseModel(err.message, null, true))
        res.status(response.failed ? 400 : 200).send(response)
    }
}