//import modules

import { Request, Response } from 'express'

import { Campaign } from '../Models/campaign'
import { User } from '../Models/user'
import { StartUp, startUpSchemaValidate } from '../Models/startup'


class startUpcontroller {

    addstartUp = async (req: any, res: Response) => {

        try {

            //validating the request
            if (!req.file) {
                 res.status(400).send('No file uploaded');
              }
          
              // Construct the image URL
              const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
          
            req.body.slug = req.body.title.replace(/\s+/g, '-').toLowerCase()
            req.body.image = imageUrl
            const { error, value } = startUpSchemaValidate.validate(req.body)
            if (error) {

                res.status(400).json({ message: error.message })

            } else {
                 const newstartUp = await StartUp.create({ ...value })
                res.status(200).json({ message: 'Success', newstartUp })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error })

        }
       

    }


    getstartUps = async (req: Request, res: Response) => {
        try {
            const startUp = await StartUp.find().populate('author')

            res.status(200).json({ message: 'Success', startUp })
        } catch (error) {
            res.status(400).json(error)
        }
    }


    getstartUp = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const startUp = await StartUp.findById(id)
            res.status(200).json({ message: 'Success', startUp })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    //updat
    updatestartUp = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const startUp = await StartUp.findByIdAndUpdate(id, req.body)
            res.status(200).json({ message: 'Success', startUp })
        } catch (error) {
            res.status(400).json(error)
        }
    }


    //delete 
    deletestartUp = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const startUp = await StartUp.findByIdAndDelete(id)
            res.status(200).json({ message: 'Success', startUp })
        } catch (error) {
            res.status(400).json(error)
        }
    }

}

//export class
export const startUpController = new startUpcontroller()