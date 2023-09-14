const AsyncLoop = (data, callback) => {
    return new Promise((r) => {
        processData(data, callback, () => {
            r(null)
        })
    })
}
let i = 0
const processData = async (data, callback, onDone) => {
    let obj = data[i]
    if (obj) {
        await callback(obj)
        i++
        processData(data, callback, onDone)
    } else {
        onDone()
    }
}
export default AsyncLoop