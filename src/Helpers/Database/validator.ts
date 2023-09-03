export default (token: any) => {
    let { expiry } = token
    return (new Date(expiry).getTime() - new Date().getTime()) > 0
}