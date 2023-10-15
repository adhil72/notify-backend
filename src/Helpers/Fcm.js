import admin from "firebase-admin"

const getEnvValue = (key) => process.env[key]
var serviceAccount = {
    "type": getEnvValue("TYPE"),
    "project_id": getEnvValue("PROJECT_ID"),
    "private_key_id": getEnvValue("PRIVATE_KEY_ID"),
    "private_key": getEnvValue("PRIVATE_KEY"),
    "client_email": getEnvValue("CLIENT_EMAIL"),
    "client_id": getEnvValue("CLIENT_ID"),
    "auth_uri": getEnvValue("AUTH_URI"),
    "token_uri": getEnvValue("TOKEN_URI"),
    "auth_provider_x509_cert_url": getEnvValue("AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": getEnvValue("CLIENT_X509_CERT_URL"),
    "universe_domain": getEnvValue("UNIVERSE_DOMAIN")
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const sendFcm = ({ token, data }) => {
    return admin.messaging().send({
        token, data
    })
}

export { sendFcm }