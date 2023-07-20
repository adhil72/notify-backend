import express from "express"
    import mapper from "./Helpers/Mapper"
    import { msg, success } from "./Helpers/Logger"
    
    const app = express()
    
    const port = 3001
    
    const configServer = async () => {
        const map = await mapper()
        map.forEach((router) => {
            success("Mapping : " + '/' + router.path)
            app.use('/' + router.path, router.module.default);
        });
    
        app.listen(port, () => {
            msg("Server launched successfully");
        })
    }
    
    configServer()