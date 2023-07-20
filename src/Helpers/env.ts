
function env(name: string) {
    let val = process.env[name]
    if (val) {
        return val
    } else {
        throw new Error("Variable named " + name + " is not found")
    }
}

const vars = {
    db: env('DB'),
    pwd: env('PWD'),
    user: env('user')
}

export default vars