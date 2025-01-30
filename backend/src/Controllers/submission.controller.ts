//import modules

import { Request, Response } from 'express'
import { Submission, submissionSchemaValidate } from '../Models/submission'
import { Campaign } from '../Models/campaign'
import { User } from '../Models/user'




class submissioncontroller {

    addsubmission = async (req: any, res: Response) => {

        try {

            const user: any = await User.findById(req.uid)
            if (!user || user.role !== "influencer") {
                res.status(403).json({ message: "Not Authorized to create a campaign submission" })
            }

            //validating the request
            const { error, value } = submissionSchemaValidate.validate(req.body)

            if (error) {

                res.status(400).json({ message: error.message })

            } else {
                const campaign: any = Campaign.findById(req.body.campaignID)
                if (!campaign) {
                    res.status(403).json({ message: "Campaign does Not Exist" })
                }

                const newsubmission = await Submission.create({ ...value, createdBy: req.uid })
                res.status(200).json({ message: 'Success', newsubmission })
            }
        } catch (error) {
            res.status(400).json({ message: error })

        }
       

    }


    getsubmissions = async (req: Request, res: Response) => {
        try {
            const submission = await Submission.find()

            res.status(200).json({ message: 'Success', submission })
        } catch (error) {
            res.status(400).json(error)
        }
    }


    getsubmission = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const submission = await Submission.findById(id)
            res.status(200).json({ message: 'Success', submission })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    //updat
    updatesubmission = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const submission = await Submission.findByIdAndUpdate(id, req.body)
            res.status(200).json({ message: 'Success', submission })
        } catch (error) {
            res.status(400).json(error)
        }
    }


    //delete 
    deletesubmission = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const submission = await Submission.findByIdAndDelete(id)
            res.status(200).json({ message: 'Success', submission })
        } catch (error) {
            res.status(400).json(error)
        }
    }

}

//export class
export const SubmissionController = new submissioncontroller()