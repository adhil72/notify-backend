import { getUserDataController } from "../../../Controllers/auth.controller.js"
import ResponseModel from "../../../Constants/ResponseModel.js"
export default {
    mode: 'get', fun: async (req, res) => {
        let response = await getUserDataController(req.user)
            .then((data) => ResponseModel("user data fetched", data, false))
            .catch((err) => ResponseModel(err.message, null, true))
        res.status(response.failed ? 400 : 200).send(response)
    }
}