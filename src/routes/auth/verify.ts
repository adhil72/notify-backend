import express from 'express';
import { send } from '../../Helpers/Gmail/Gmail';
import { confirmVerification, createVerification } from '../../Helpers/Database/Schemas/auth';
const router = express.Router();

router.post('/', async (req, res) => {
    let { id, code } = req.body
    if (code) {
        res.send(await confirmVerification({ id, code }))
    } else {
        res.send(await createVerification(id))
    }
});

export default router;