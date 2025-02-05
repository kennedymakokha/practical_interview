//import modules

import { Request, Response } from 'express'

import { Campaign } from '../Models/campaign'
import { User } from '../Models/user'
import { Author, authorSchemaValidate } from '../Models/author'
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
            const id = req.params.id
            const author = await Author.findById(id)
            res.status(200).json({ message: 'Success', author })
        } catch (error) {
            res.status(400).json(error)
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