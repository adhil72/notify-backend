import express from 'express';
import { generateAddToken } from '../../../Helpers/Database/Schemas/Device';
const router = express.Router();

router.get('/', async (req, res) => {
    res.send(await generateAddToken({ access: req.headers.access as string }))
});

export default router;