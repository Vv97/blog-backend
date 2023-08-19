import { Router } from "express";
import { uploadImage, getImage } from "../controller/image-controller.js";
import uploadMiddleware from "../middleware/upload-middleware.js";



const fileuploaderRoute = Router();

fileuploaderRoute.post("/upload", uploadMiddleware.single('file'), uploadImage)

fileuploaderRoute.use("/:filename", getImage)


export default fileuploaderRoute