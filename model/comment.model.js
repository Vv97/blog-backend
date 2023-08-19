import mongoose from "mongoose";


const commentSchema = mongoose.Schema({
    postID: {
        type: String,
        require: true,
    },

    createdAt: {
        type: Number,
        require: true
    },

    comment: {
        type: String,
        require: true
    },


    username: {
        type: String,
        require: true
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



const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;