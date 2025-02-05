
//importing modules
import { Schema, StringSchemaDefinition, Types, model, } from 'mongoose'
import Joi, { number } from 'joi'


//validation schema
export const startUpSchemaValidate = Joi.object({
    title: Joi.string().required(),
    views: Joi.number(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    slug: Joi.string().required(),
    pitch: Joi.string().required(),
    category: Joi.string().required(),

})

//creating an interface 
interface Istartup {
    title: string,
    slug: string,
    author: Types.ObjectId;
    views: number,
    deletedAt: string,
    description: string
    category:StringSchemaDefinition

}

const startupSchema = new Schema<Istartup>({
    title: {
        type: String,
    },
    views: {
        type: Number,
    },
    slug: {
        type: String,
      
    },
    description: {
        type: String,  
    },
    category: {
        type: String,
      
    },
    author: { type: Schema.Types.ObjectId, ref: 'startup' },

}, { timestamps: true })


//creating a model
export const StartUp = model<Istartup>('startup', startupSchema)