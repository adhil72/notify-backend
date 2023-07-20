import express from 'express';
import { updatePassword } from '../../../Helpers/Database/Schemas/auth';
const router = express.Router();

router.post('/', (req, res) => {
    updatePassword(req.body).then((data) => {
        res.send(data)
    })
});

export default router;