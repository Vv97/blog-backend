import grid from "gridfs-stream";
import mongoose from "mongoose";




const url = "https://relieved-rose-cowboy-boots.cyclic.app";
const conn = mongoose.connection;

let gfs, gridfsBucket;
conn.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });

    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs')
})

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(404).send({
                success: false,
                message: "File Not Found"
            })
        }


        const Newurl = `${url}/file/${req.file.filename}`;


        return res.status(200).send(Newurl)

    } catch (error) {
        console.log(error)
    }
}

export const getImage = async (req, res) => {

    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res)
    } catch (error) {
        res.status(500).send({ mssg: error.message })
    }
}