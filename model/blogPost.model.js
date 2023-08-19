import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },

    description: {
        type: String,
        require: true,
    },

    picture: {
        type: String,
        require: true,
    },

    username: {
        type: String,
        require: true,
    },
    categories: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Number,
        require: true,
    },

    userID: {
        type: String,
        require: true
    }


},
    {
        versionKey: false
    }
);


const postModel = mongoose.model("blog", postSchema);

export default postModel