import postModel from "../model/blogPost.model.js"



export const getPost = async (req, res) => {
    try {
        const postData = await postModel.find();
        let postCount = await postModel.countDocuments();
        res.status(200).send({
            success: true,
            postCount,
            postData
        })
    } catch (error) {
        console.log("Post", error);
        res.status(500).send({
            success: false,
            message: "Error In Post",
            error
        });
    }
}

export const createPost = async (req, res) => {
    try {
        const { title, description, picture, username, categories, createdAt } = req.body;


        if (!title && !description && !picture && !username && !categories && !createdAt) {
            return res.status(404).send({ success: false, message: "please fill all the fields" });
        }

        // creating model and saving data at database same time
        let newBlog = await postModel(req.body).save()
        res.status(201).send({
            success: true,
            message: "new blog created",
        })

    } catch (error) {
        console.log("Post", error);
        res.status(500).send({
            success: false,
            message: "Error In Post",
            error
        });
    }
}


export const getSingleBlog = async (req, res) => {
    try {
        const { singleID } = req.params;
        let blogExit = await postModel.findOne({ _id: singleID });
        res.status(200).send({ data: blogExit })

    } catch (error) {
        console.log("Post", error);
        res.status(500).send({
            success: false,
            message: "Error In Post",
            error
        });
    }
}


export const updateBLog = async (req, res) => {
    try {
        const { updateID } = req.params;

        if (!updateID) {
            res.status(400).send({
                success: false, message: "The updateID parameter is missing in the request."
            })
        }


        await postModel.findByIdAndUpdate({ _id: updateID }, { ...req.body });

        res.status(200).send({ success: true, message: "Product was deleted successfully!" });

    } catch (error) {
        console.log("post", error)
        res.status(500).send({
            success: false,
            message: "Error In Post Update",
            error
        });
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { deleteID } = req.params;

        if (!deleteID) {
            res.status(400).send({
                success: false, message: "The deleteid parameter is missing in the request."
            })
        }

        await postModel.findByIdAndDelete({ _id: deleteID })
        res.status(200).send({ message: "blog was deleted successfully!" });




    } catch (error) {
        console.log("post", error)
        res.status(500).send({
            success: false,
            message: "Error In Post Delete",
            error
        });
    }
}


