export default (token: any) => {
    let { expiry } = token
    return (new Date().getTime() - new Date(expiry).getTime()) > 0
}