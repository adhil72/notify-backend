function errorFilter(err: any) {
    let msg = err.message
    let probs = Object.keys(err.errors)
    return { msg, probs }
}
export { errorFilter }