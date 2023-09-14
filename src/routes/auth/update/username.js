import { updateUserNameController } from "../../../Controllers/auth.controller.js";
import ResponseModel from "../../../Constants/ResponseModel.js";

export default {
    mode: 'post', fun: async (req, res) => {
        let response = await updateUserNameController(req.body, req.user)
            .then(() => ResponseModel("username updated successfully", null, false))
            .catch((err) => ResponseModel(err.message, null, true))
        res.status(response.failed ? 400 : 200).send(response)
    }
}