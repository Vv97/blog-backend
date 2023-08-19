import dotenv from "dotenv"

import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

const storage = new GridFsStorage({
    url: process.env.mongoDB_url,
    options: { useNewUrlParser: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.mimeType) === -1) {
            return `${Date.now()}-blog-${file.originalname}`
        }



        return {
            bucketname: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});


export default multer({ storage })