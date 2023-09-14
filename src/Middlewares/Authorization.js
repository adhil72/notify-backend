import jwt from 'jsonwebtoken';
import {JwtSecret} from '../Helpers/env.js';
import publicRoutes from "../Constants/PublicRoutes.js";


export default (req, res, next) => {
    let path = req.path
    if (publicRoutes.includes(path)) {
        next()
        return
    }
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, JwtSecret(), (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}