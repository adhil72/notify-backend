import express from 'express';
import { validateAddToken } from '../../../Helpers/Database/Schemas/Device';
const router = express.Router();

router.post('/', async (req, res) => {
    req.body.access = req.headers.access
    res.send(await validateAddToken(req.body))
});

export default router;