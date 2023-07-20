import { Db, MongoClient } from 'mongodb';
import vars from '../env';

const uri = `mongodb://localhost:27017`;
const client = new MongoClient(uri);

let configs: { db?: Db, status: boolean } = { status: false }


export function connect() {
    return new Promise((r, j) => {
        client.connect().then(() => {
            configs.db = client.db(vars.db)
            r(200)
        }).catch((e) => {
            j(e)
        })
    })
}

