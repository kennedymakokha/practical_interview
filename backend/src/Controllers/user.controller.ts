//import modules

import { Request, Response } from 'express'
import { UserschemaValidate } from '../Models/user'
import { User, } from '../Models/user'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'


class userController {
    //add post controller
    adduser = async (req: Request, res: Response) => {

        try {
            const data = {
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                password: req.body.password,
            }
            //validating the request
            const { error, value } = UserschemaValidate.validate(data)

            if (error) {

                res.status(400).json({ message: error.message })

            } else {
                const newUser = await User.create(value)
                res.status(200).json({ message: 'Success', newUser })
            }
        } catch (error) {
            res.status(400).json({ message: error })

        }
        //data to be saved in database


    }
    loginuser = async (req: Request, res: Response) => {

        try {
            const user = await User.findOne({
                email: req.body.email,
                // deleted_at: null,
            });

            if (!user) {
                return res
                    .status(400)
                    .json({ success: false, message: "User Does Not Exist !" });
            }
            const isEqual = await bcrypt.compare(req.body.password, user.password);

            if (!isEqual) {
                return res
                    .status(400)
                    .json({ success: false, message: "Password is Incorrect !" });
            }
            const iat = Math.floor(Date.now() / 1000);

            // Expires After 2 Hours
            const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 2;
            const token = jwt.sign(
                {
                    iat: iat,
                    exp: exp,
                    uid: user._id,
                },
                "secret"
            );
            return res.status(200).json({ message: 'Success', user, token })

        } catch (error) {
            return res.status(400).json({ message: error })
        }


    }


    getPosts = async (req: Request, res: Response) => {
        try {
            const user = await User.find()
            console.log(user)
            res.status(200).json({ message: 'Success', user })
        } catch (error) {
            res.status(400).json(error)
        }
    }


    getAuser = async (req: any, res: Response) => {
        try {

            const user = await User.findById(req.uid)
            res.status(200).json({ message: 'Success', user })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    //update post
    updateuser = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const user = await User.findByIdAndUpdate(id, req.body)
            res.status(200).json({ message: 'Success', user })
        } catch (error) {
            res.status(400).json(error)
        }
    }


    //delete a post
    deleteuser = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const user = await User.findByIdAndDelete(id)
            res.status(200).json({ message: 'Success', user })
        } catch (error) {
            res.status(400).json(error)
        }
    }

}

//export class
export const UserController = new userController()