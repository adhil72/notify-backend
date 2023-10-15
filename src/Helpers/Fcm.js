import admin from "firebase-admin"
import { readFileSync } from 'fs'
var serviceAccount = JSON.parse(readFileSync(process.cwd() + '/firebase-admin.json', 'utf8'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const sendFcm = ({ token, data }) => {
    return admin.messaging().send({
        token, data
    })
}

export { sendFcm }