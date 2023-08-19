import { comparePassword, hashPassword } from "../helper/user-helper.js"
import { usermodel } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import tokenModel from "../model/token.model.js";
import dotenv from "dotenv"

let secret_key = process.env.secret_key

let refresh_secret_key = process.env.refresh_secret_key



export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let userExist = await usermodel.findOne({ email });

        // checking if user already exist or not
        if (userExist) {
            return res.status(409).send({
                message: "User already registered",
                success: true,
            })
        }

        //  hasing a password 
        const hash = await hashPassword(password);

        // creating a model of user then saving in database
        await new usermodel({ username, email, password: hash }).save();

        res.status(201).send({
            success: true,
            message: "Register Successfully"
        })
    } catch (error) {
        console.log("Error in register route", error)
        res.status(500).send({
            success: false,
            message: "Error In Registeration",
            error
        })
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // checking if user exist or not
        // exist -> go forward
        const userExist = await usermodel.findOne({ email });

        // not exist
        if (!userExist) {
            //The "404 Not Found" status code indicates that the requested resource could not be found on the server. In the context of user-related operations, it would mean that the user you're trying to interact with does not exist in the system.
            return res.status(404).send({
                success: false,
                message: "Email Is Not Register"
            })
        }

        // comparing passowrd with hashpasswor
        const correctPassword = await comparePassword(password, userExist.password);

        if (!correctPassword) {
            return res.status(404).send({
                success: false,
                message: "Invalid Password"
            });
        }


        // token
        const accesstoken = await jwt.sign({ _id: userExist._id }, secret_key, { expiresIn: '15m' });
        const refeshtoken = await jwt.sign({ _id: userExist._id }, refresh_secret_key);
        await new tokenModel({ token: refeshtoken }).save();


        res.status(200).send(({
            success: true,
            message: "Login Successfully",
            user: {
                username: userExist.username,
            },
            accesstoken,
            refeshtoken
        }))


    } catch (error) {
        console.log("Login", error)
        res.status(500).send({
            success: false,
            message: "Error In Login",
            error
        })
    }
}


