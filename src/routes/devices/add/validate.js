import { validateDeviceRequestController } from "../../../Controllers/devices.controller.js";
import ResponseModel from "../../../Constants/ResponseModel.js";

export default {
    mode: 'POST', fun: async (req, res) => {
        let response = await validateDeviceRequestController(req.body)
            .then((data) => ResponseModel("device added", data, false))
            .catch((err) => ResponseModel(err.message, null, true))
        console.log(response);
        res.status(response.failed ? 400 : 200).send(response)
    }
}