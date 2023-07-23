import express from 'express';
import { getAllDevice } from '../../../Helpers/Database/Schemas/Device';
const router = express.Router();

router.get('/', async (req, res) => {
    req.body.access = req.headers.access
    res.send(await getAllDevice(req.body))
});

export default router;