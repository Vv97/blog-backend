import { Router } from "express";
import { createComment, getComments, deleteComment } from "../controller/comment-controller.js";

const commentRouter = Router();

// GET COMMENTS  || METHOD:GET
commentRouter.get("/", getComments);

// CREATE COMMENT || METHOD:POST
commentRouter.post("/create", createComment);

// DELETE COMMENT || METHOD:DELETE
commentRouter.delete("/:deleteID", deleteComment)

export default commentRouter