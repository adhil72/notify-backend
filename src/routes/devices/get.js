import { getAllDeviceController } from "../../Controllers/devices.controller.js"
import ResponseModel from "../../Constants/ResponseModel.js"

export default {
    mode: 'get', fun: async (req, res) => {
        let response = await getAllDeviceController(req.user)
            .then((data) => ResponseModel("devices fetched", data, false))
            .catch((err) => ResponseModel(err.message, null, true))
        res.status(response.failed ? 400 : 200).send(response)
    }
}