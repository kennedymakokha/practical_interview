
//importing modules
import { Schema, Types, model, } from 'mongoose'
import Joi from 'joi'


//validation schema
export const authorSchemaValidate = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    // email: Joi.string().required(),
})

//creating an interface 
interface IAuthor {
    name: string,
    email: string,
    username: string,
    deletedAt: string,
    image: any

}

const authorSchema = new Schema<IAuthor>({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    username: {
        type: String,
      
    },
    image: {
        type: String,
    
    },

}, { timestamps: true })


//creating a model
export const Author = model<IAuthor>('author', authorSchema)