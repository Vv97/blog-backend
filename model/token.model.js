import mongoose from "mongoose";


const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        require: true
    }
},
    {
        versionKey: false
    }
);


const tokenModel = mongoose.model('token', tokenSchema);


export default tokenModel