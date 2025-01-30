
//importing modules
import { Schema, Types, model, } from 'mongoose'
import Joi, { array } from 'joi'


//validation schema
export const submissionSchemaValidate = Joi.object({
    links: Joi.array().required(),
    description: Joi.string().required(),
    campaignID: Joi.string().required(),
})

//creating an interface 
interface ISubmissiion {
    links: any,
    approved: string,
    description: string,
    deletedAt: string
    createdBy: Types.ObjectId;
    campaignID: Types.ObjectId;

}

const submissionSchema = new Schema<ISubmissiion>({
    links: {
        type: Array,
    },
    description: {
        type: String,
    },
    approved: {
        type: String,
        default: null
    },
    campaignID: { type: Schema.Types.ObjectId, ref: 'Campaign' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },




}, { timestamps: true })


//creating a model
export const Submission = model<ISubmissiion>('Submission', submissionSchema)