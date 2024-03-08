
import ResponseModel from "../../../Constants/ResponseModel.js";
import { generateAuthToken } from "../../../Controllers/auth.controller.js";

export default {
    mode: 'get', fun: async (req, res) => {
        let response = await generateAuthToken(req.user)
            .then((token) => ResponseModel("user logged in", { token }, false))
            .catch((err) => ResponseModel(err.message, null, true))
        res.status(response.failed ? 400 : 200).send(response)
    }
}