import { Router } from "express";
import { createPost, getPost, getSingleBlog, updateBLog, deleteBlog } from "../controller/post-controller.js";

const postRouter = Router();

// BLOGS || METHOD:GET
postRouter.get("/", getPost);

// BLOGS:singleID || METHOD:GET
postRouter.get("/:singleID", getSingleBlog)


// CREATE || METHOD:POST
postRouter.post("/create", createPost);

//UPDATE || METHOD:PATCH
postRouter.patch("/update/:updateID", updateBLog)

//DELETE ||METHOD:DELETE
postRouter.delete("/delete/:deleteID", deleteBlog)




export default postRouter