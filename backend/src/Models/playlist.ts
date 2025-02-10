
//importing modules
import { Schema, StringSchemaDefinition, Types, model, } from 'mongoose'
import Joi, { number } from 'joi'


//validation schema


//creating an interface 
interface ISelect {
    title: string,
    slug: string,
    select: Array<Types.ObjectId>;
    deletedAt: string,
    

}

const selectSchema = new Schema<ISelect>({
    title: {
        type: String,
    },
    
    slug: {
        type: String,
    },
    select: {
        type: [
            { type: Schema.Types.ObjectId, ref: 'startup' }
        ],
    },


}, { timestamps: true })


//creating a model
export const Select = model<ISelect>('select', selectSchema)