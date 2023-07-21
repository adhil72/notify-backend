import { readFileSync, writeFileSync } from "fs"
import path from "path"
import process from "process"
import { authenticate } from "@google-cloud/local-auth"
import { google } from "googleapis";

const SCOPES = ['https://www.googleapis.com/auth/gmail.compose', 'https://www.googleapis.com/auth/gmail.modify'];

const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';

async function loadSavedCredentialsIfExist() {
    try {
        const content = readFileSync(TOKEN_PATH, 'utf8');
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

async function saveCredentials(client: any) {
    const content = readFileSync(CREDENTIALS_PATH, 'utf8');
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    writeFileSync(TOKEN_PATH, payload);
}

async function authorize() {
    let client: any = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    auth = client
    return client;
}

function makeBody(to: string, from: string, subject: string, message: string) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');

    var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
    return encodedMail;
}

let auth: any = null

function send(params: { to: string, message: string, subject: string }) {
    return new Promise(async (r, j) => {
        if (!auth) {
            await authorize()
        }

        if (auth) {
            const gmail = google.gmail({ version: 'v1', auth });
            let from = 'adhil.mhdk28@gmail.com'
            var raw = makeBody(params.to, from, params.subject, params.message);
            let props: any = {
                auth: auth,
                userId: from,
                resource: {
                    raw: raw
                }
            }
            gmail.users.messages.send(props, function (err: any, response: any) {
                r(response)
            });
        }
    })
}

export { authorize, send }