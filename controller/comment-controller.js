import commentModel from "../model/comment.model.js";



export const getComments = async (req, res) => {
    try {
        let args = {};
        const { sort, order, postID } = req.query;
        let sorted = {};
        if (postID) {
            args.postID = req.query.postID
        }


        if (sort) {
            sorted[sort] = order ?? "asc"
        }


        let commentsData = await commentModel.find(args).sort(sorted);

        res.status(200).send({
            success: true,
            commentsData
        })

    } catch (error) {
        console.log("comments", error);
        res.status(500).send({
            success: false,
            message: "Error In comments",
            error
        });
    }
}

export const createComment = async (req, res) => {
    try {
        // comment document created and save to database at a same time
        await commentModel({ ...req.body }).save();

        res.status(201).send({
            success: true,
            message: "new comment created",
        })
    } catch (error) {
        console.log("comments", error);
        res.status(500).send({
            success: false,
            message: "Error In comments",
            error
        });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { deleteID } = req.params;

        if (!deleteID) {
            res.status(400).send({
                success: false, message: "The deleteid parameter is missing in the request."
            })
        }

        await commentModel.findByIdAndDelete({ _id: deleteID })
        res.status(204).send({ message: "comment was deleted successfully!" });

    } catch (error) {
        console.log("comments", error);
        res.status(500).send({
            success: false,
            message: "Error In comments",
            error
        });
    }
}