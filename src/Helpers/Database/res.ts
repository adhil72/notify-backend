
export default {
    internelError: { msg: 'An unexpected internal error has occureed', code: 503 },
    success: (msg: string) => { return { msg, code: 200 } }
}