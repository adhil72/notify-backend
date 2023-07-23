import express from 'express';
import { createToken } from '../../Helpers/Database/Schemas/auth';
const router = express.Router();

router.post('/', async (req, res) => {
    let { password, id } = req.body
    if (password && id) {
        res.send(await createToken(req.body))
    } else {
        res.send({ code: 503, msg: "Invalid request" })
    }
});

export default router;