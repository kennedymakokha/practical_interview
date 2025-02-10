//import modules

import { Request, Response } from 'express'

import { Campaign } from '../Models/campaign'
import { User } from '../Models/user'
import { Author, authorSchemaValidate } from '../Models/author'
import jwt from 'jsonwebtoken'
// import { Author, authorSchemaValidate } from '../Models/author'




class authorcontroller {

    addauthor = async (req: any, res: Response) => {

        try {

            //validating the request
            const { error, value } = authorSchemaValidate.validate(req.body)
            const newauthor = await Author.create({ ...value })
            res.status(200).json({ message: 'Success', newauthor })

        } catch (error) {
            res.status(400).json({ message: error })

        }


    }


    getauthors = async (req: Request, res: Response) => {
        try {
            const author = await Author.find()

            res.status(200).json({ message: 'Success', author })
        } catch (error) {
            res.status(400).json(error)
        }
    }


    getauthor = async (req: Request, res: Response) => {
        try {
            let author = null
            const id = req.params.id
            if (req.query.auth) {
                author = await Author.findOne({ $or: [{ id: id }] })

            }
            author = await Author.findById(id)
            res.status(200).json({ message: 'Success', author })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    loginauthor = async (req: Request, res: Response) => {
        console.log("Token Generation")
        try {
            const { id } = req.query

            const author = await Author.findOne({ $or: [{ id: id }] })

            // if (!user) {
            //      res
            //         .status(400)
            //         .json({ success: false, message: "User Does Not Exist !" });
            // }
            // const isEqual = await bcrypt.compare(req.body.password, user.password);

            // if (!isEqual) {
            //      res.status(400)
            //         .json({ success: false, message: "Password is Incorrect !" });
            // }
            const iat = Math.floor(Date.now() / 1000);

            // Expires After 2 Hours
            const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 2;
            const token = jwt.sign(
                {
                    iat: iat,
                    exp: exp,
                    uid: author?._id,
                },
                "secret"
            );
            res.status(200).json({ message: 'Success', author, token, exp })

        } catch (error) {
            res.status(400).json({ message: error })
        }


    }

    //updat
    updateauthor = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const author = await Author.findByIdAndUpdate(id, req.body)
            res.status(200).json({ message: 'Success', author })
        } catch (error) {
            res.status(400).json(error)
        }
    }


    //delete 
    deleteauthor = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const author = await Author.findByIdAndDelete(id)
            res.status(200).json({ message: 'Success', author })
        } catch (error) {
            res.status(400).json(error)
        }
    }

}

//export class
export const authorController = new authorcontroller()