import express from 'express';
import { validateAddToken } from '../../../Helpers/Database/Schemas/Device';
const router = express.Router();

router.post('/', async (req, res) => {
    res.send(await validateAddToken(req.body))
});

export default router;