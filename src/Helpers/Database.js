import mongoose from 'mongoose';

const connect = () => {
    return mongoose.connect('mongodb://127.0.0.1:27017/visitingcard')
}

export {connect}