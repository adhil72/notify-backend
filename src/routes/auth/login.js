import {userLoginController} from "../../Controllers/auth.controller.js";
import ResponseModel from "../../Constants/ResponseModel.js";

export default {
    mode: 'post', fun: async (req, res) => {
        let response = await userLoginController(req.body)
            .then((token) => ResponseModel("user logged in", {token}, false))
            .catch((err) => ResponseModel(err.message, null, true))
        res.status(response.failed ? 400 : 200).send(response)
    }
}