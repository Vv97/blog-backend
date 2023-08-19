import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

let secret_key = process.env.secret_key

const autenticationToken = async (req, res, next) => {
    try {
        const autherizaion = req.headers.authorization;
        const token = autherizaion;

        if (!token) {
            return res.status(403).send({ message: 'token is missing' });
        };


        // only valid user can through further api req
        jwt.verify(token, secret_key, (error, user) => {
            if (error) {
                return res.status(403).send({ message: 'invalid token' })
            }
            if (req.method !== "PATCH") {
                req.body.userID = user._id;
            }
            next();
        })


    } catch (error) {
        console.log("Error in autherizaion", error)
    }
};


export default autenticationToken