import express from 'express';
import {msg, success} from './Helpers/Logger.js';
import cors from 'cors';
import authorizationMiddleware from './Middlewares/Authorization.js';
import * as env from './Helpers/env.js';
import {connect} from './Helpers/Database.js';
import mapper from "./Helpers/Mapper.js";


const app = express()
app.use(express.json())
app.use(cors({allowedHeaders: "*", origin: "*"}))
app.use(authorizationMiddleware)
const port = process.env.PORT

Object.keys(env).forEach((key) => {
    env[key]
})

const configServer = async () => {
    const map = await mapper()
    map.forEach((router) => {
        router.mode = router.mode.toLocaleLowerCase()
        if (router.mode === 'post') {
            success("Mapping : post " + '/' + router.path)
            app.post('/' + router.path, router.fun)
        } else if (router.mode === 'get') {
            success("Mapping : get " + '/' + router.path)
            app.get('/' + router.path, router.fun)
        } else if (router.mode === 'patch') {
            success("Mapping : get " + '/' + router.path)
            app.patch('/' + router.path, router.fun)
        } else if (router.mode === 'delete') {
            success("Mapping : get " + '/' + router.path)
            app.delete('/' + router.path, router.fun)
        } else if (router.mode === 'put') {
            success("Mapping : get " + '/' + router.path)
            app.put('/' + router.path, router.fun)
        }
    });

    connect().then(() => {
        msg("Database connected")
        app.listen(port, () => {
            msg("Server launched successfully");
        })
    })

}

configServer()
    