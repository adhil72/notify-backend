import { Collection, Connection, connect as c, connection } from 'mongoose';
import vars from '../env';

const uri = `mongodb://localhost:27017`;

let configs: { users?: Collection } = {}

export function connect() {
    return new Promise((r, j) => {
        c(uri).then(() => {
            r(200)
            configs.users = connection.collection('users')
        }).catch((e) => {
            j(e)
        })
    })
}
export { configs }