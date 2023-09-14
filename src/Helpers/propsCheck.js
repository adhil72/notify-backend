import ResponseModel from "../Constants/ResponseModel.js";

export default (props, obj, res) => {
    let checked = true
    for (let i = 0; i < props.length; i++) {
        let p = props[i]
        if (!obj[p]) {
            res.status(503).send(ResponseModel(`required field ${p} not given`, null, true))
            checked = false
            break
        }
    }
    return checked
}