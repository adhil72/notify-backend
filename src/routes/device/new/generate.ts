import express from 'express';
import { generateAddToken } from '../../../Helpers/Database/Schemas/Device';
const router = express.Router();

router.post('/', async (req, res) => {
    res.send(await generateAddToken(req.body))
});

export default router;