import express from 'express';
import connectDb from './db/database.db.js';
import userRouter from './routes/user-route.js';
import cors from "cors"
import fileuploaderRoute from './routes/fileupload-route.js';
import postRouter from './routes/post-route.js';
import autenticationToken from './middleware/authenticationToken-middleware.js';
import commentRouter from "./routes/comment-route.js"


const app = express();

// middleware
app.use(cors())
app.use(express.json());



app.get("/", (req, res) => {
    res.send("hello")
})

app.use("/user", userRouter)
app.use("/file", fileuploaderRoute);
app.use("/blogs", autenticationToken, postRouter)
app.use("/comments", autenticationToken, commentRouter)



connectDb()
    .then((_) => {
        app.listen(8080, () => {
            console.log("server is running at 8080 port")
        })
    })