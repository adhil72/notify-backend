
export default {
    internelError: { msg: 'An unexpected internal error has occureed', code: 503 },
    success: (msg: string) => { return { msg, code: 200 } },
    timeout: { msg: 'timeout error', code: 505 }
}