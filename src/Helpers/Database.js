import mongoose from 'mongoose';

const connect = () => {
    let accessString = process.env.DB
    return mongoose.connect(accessString?accessString:'')
}

export {connect}