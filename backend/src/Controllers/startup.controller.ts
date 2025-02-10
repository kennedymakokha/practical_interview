//import modules

import { Request, Response } from 'express'

import { Campaign } from '../Models/campaign'
import { User } from '../Models/user'
import { StartUp, startUpSchemaValidate } from '../Models/startup'


class startUpcontroller {

    addstartUp = async (req: any, res: Response) => {

        try {
            console.log(req.body)
            //validating the request
            // if (!req.file) {
            //     res.status(400).send('No file uploaded');
            // }

            // Construct the image URL
            // const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            req.body.slug = req.body.title.replace(/\s+/g, '-').toLowerCase()
            req.body.image = "http://localhost:8000/uploads/1738926242837.jpg"
            req.body.author = "67a4c88574993ee5993de31b"
            const { error, value } = startUpSchemaValidate.validate(req.body)
            if (error) {

                res.status(400).json({ message: error.message })

            } else {
                const newstartUp = await StartUp.create({ ...value })
                res.status(200).json(newstartUp)
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error })

        }

    }
    getstartUps = async (req: Request, res: Response) => {
        try {

            const { search, id } = req.query
            let options = {}
            if (search === 'null' || search === undefined) {
                options = {}
            } else {
                var searchKey = new RegExp(`${search}`, 'i')
                options = { $or: [{ title: searchKey }, { category: searchKey }, { description: searchKey }], deletedAt: null }
            }
            const startUp = await StartUp.find(options).populate('author')
            res.status(200).json({ message: 'Success', startUp })
        } catch (error) {
            res.status(400).json(error)
        }
    }
    getUserstartUps = async (req: Request, res: Response) => {

        try {
            const { id } = req.params
            console.log(id)
            const startUp = await StartUp.find({ author: id, deletedAt: null }).populate('author')
            res.status(200).json({ message: 'Success', startUp })
        } catch (error) {
            res.status(400).json(error)
        }
    }
    getstartUp = async (req: Request, res: Response) => {
        const { views } = req.query
        try {
            const id = req.params.id
            let startUp = undefined
            await StartUp.findById(id).populate('author')
            if (views) {
                startUp = await StartUp.findById(id).select('views')
            } else {
                startUp = await StartUp.findById(id).populate('author')
            }
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