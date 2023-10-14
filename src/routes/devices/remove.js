import { disconnectDeviceController, getAllDeviceController } from "../../Controllers/devices.controller.js"
import ResponseModel from "../../Constants/ResponseModel.js"

export default {
    mode: 'post', fun: async (req, res) => {
        let response = await disconnectDeviceController(req.user)
            .then((data) => ResponseModel("device removed", data, false))
            .catch((err) => ResponseModel(err.message, null, true))
        res.status(response.failed ? 400 : 200).send(response)
    }
}