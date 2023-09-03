import admin from 'firebase-admin';
import path from "path"
import { msg } from '../Logger';

const serviceAccount = path.join(process.cwd(), 'firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendMessage = (token: string, body: { msg: string }) => {
    admin.messaging().send({
        data: body,
        token: token,
    }).then((s)=>{
        console.log(s);
        
    })
}
if (process.argv[2] != null) {
    if (process.argv[2] == 'test') {
        sendMessage('ccByUZcHTtaIv3R1hsHa7e:APA91bEOiA507YwgOIAAPJ0AKAZo2SX1LP-DqlhXH6VcIHjsUbvEbhWqW9RZdGCuVhVcq05uLFNk47wh76o3fYu7_Sx4Fejh-1ZKLZkkqgdZ4WjZg_p78vqpR-8TPIyOTPysRy-HFB6D',
            { msg: 'Hello' })
    }
}
msg(process.argv)