import ResponseModel from "../../../Constants/ResponseModel.js";
import {addDeviceRequestController} from "../../../Controllers/devices.controller.js";

export default {
    mode: 'POST', fun: async (req, res) => {
        let response = await addDeviceRequestController(req.user)
            .then((token) => ResponseModel("request created", {token}, false))
            .catch((err) => ResponseModel(err.message, null, true))
        res.status(response.failed ? 400 : 200).send(response)
    }
}