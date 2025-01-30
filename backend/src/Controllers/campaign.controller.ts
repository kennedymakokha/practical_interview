//import modules

import { Request, Response } from 'express'


import { Campaign, campaignSchemaValidate } from '../Models/campaign'
import { User } from '../Models/user'
import { Submission } from '../Models/submission'
import mongoose from 'mongoose'

class campaignController {

    addCampaign = async (req: any, res: Response) => {

        try {

            const user: any = await User.findById(req.uid)
          
            if (!user || user.role !== "campaigner") {
                res.status(403).json({ message: "Not Authorized to create a campaign" })
            }
            //validating the request
            const { error, value } = campaignSchemaValidate.validate(req.body)
            if (error) {
                res.status(400).json({ message: error.message })
            } else {
                const newcampaign = await new Campaign({ ...value, createdBy: req.uid }).save()
                console.log(newcampaign)
                res.status(200).json({ message: 'Success', newcampaign })
            }
        } catch (error) {
            res.status(400).json({ message: error })

        }
        //data to be saved in database


    }


    getCampaigns = async (req: any, res: Response) => {
        try {
            let options: any = {}
           
            const user: any = await User.findById(req.uid)
            if (!user) {
                res.status(403).json({ message: "Not Authorized " })
            }
            // if (user.role === "campaigner") {
            //     options.createdBy = req.uid

            // } else {
            //     options.state = { $in: ['launched', 'completed'] }

            // }
            // await Campaign.find(options)
            const campaign = await Campaign.aggregate([
                {
                    $match: options,
                },
                {
                    $lookup: {
                        from: "submissions", // the collection name of the CategoryImage model
                        localField: "_id", // field in Category that matches with foreignField
                        foreignField: "campaignID", // field in CategoryImage that references Category
                        as: "submissions", // alias for the joined images
                    },
                },
            ]).exec()
            console.log("second", campaign)

            res.status(200).json({ message: 'Success', campaign })
        } catch (error) {
            res.status(400).json(error)
        }
    }
    getSubmissions = async (req: any, res: Response) => {
        try {

            const submissions = await Submission.find({ campaignID: req.params.id }).populate("campaignID")

            res.status(200).json({ message: 'Success', submissions })
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }


    getCampaign = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const campaign = await Campaign.findById(id)
            res.status(200).json({ message: 'Success', campaign })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    //updat
    updateCampaign = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const campaign = await Campaign.findByIdAndUpdate(id, req.body)
            res.status(200).json({ message: 'Success', campaign })
        } catch (error) {
            res.status(400).json(error)
        }
    }


    //delete 
    deleteCampain = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const campaign = await Campaign.findByIdAndDelete(id)
            res.status(200).json({ message: 'Success', campaign })
        } catch (error) {
            res.status(400).json(error)
        }
    }

}

//export class
export const CampaignController = new campaignController()