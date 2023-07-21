import { config } from 'dotenv'; config()
import express from "express"
import mapper from "./Helpers/Mapper"
import { msg, success } from "./Helpers/Logger"
import { connect } from './Helpers/Database/Databse';
import { authorize } from './Helpers/Gmail/Gmail';

const app = express()
app.use(express.json())

const port = 3001

const configServer = async () => {
    const map = await mapper()
    map.forEach((router) => {
        success("Mapping : " + '/' + router.path)
        app.use('/' + router.path, router.module.default);
    });

    await connect()
    await authorize()
    msg("Database connected")

    app.listen(port, () => {
        msg("Server launched successfully");
    })
}

configServer()