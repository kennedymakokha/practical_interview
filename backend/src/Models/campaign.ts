
//importing modules
import { Schema, Types, model, } from 'mongoose'
import Joi, { array } from 'joi'


//validation schema
export const campaignSchemaValidate = Joi.object({
    name: Joi.string().required(),
    link: Joi.string(),
    budget: Joi.string(),
    description: Joi.string().required(),
    start: Joi.string().required(),
    end: Joi.string().required(),


})

//creating an interface 
interface ICampaign {
    name: string,
    link: string,
    budget: string,
    description: string,
    state: string,
   
    start: string
    end: string
    deletedAt: string
    createdBy: Types.ObjectId;

}

const campaignSchema = new Schema<ICampaign>({
    name: {
        type: String,

    },
   
    deletedAt: {
        type: String,
        default: null
    },
   

    budget: {
        type: String,

    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    start: {
        type: String,

    },
    end: {
        type: String,

    },
    link: {
        type: String,

    },
    state: {
        type: String,
        enum: ["scheduled", "launched", "completed"],
        default: "scheduled"
    },
    description: {
        type: String,
        required: true,

    },


}, { timestamps: true })


//creating a model
export const Campaign = model<ICampaign>('Campaign', campaignSchema)