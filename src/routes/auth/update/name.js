import { updateNameController } from "../../../Controllers/auth.controller.js";
import ResponseModel from "../../../Constants/ResponseModel.js";

export default {
    mode: 'post', fun: async (req, res) => {
        let response = await updateNameController(req.body, req.user)
            .then(() => ResponseModel("Name updated successfully", null, false))
            .catch((err) => ResponseModel(err.message, null, true))
        res.status(response.failed ? 400 : 200).send(response)
    }
}