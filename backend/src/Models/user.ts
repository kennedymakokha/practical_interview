
//importing modules
import { Schema, model, } from 'mongoose'
import Joi, { array } from 'joi'
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

//validation schema
export const UserschemaValidate = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.string().required(),
    password: Joi.string().required(),


})

//creating an interface 
interface IPosts {
    name: string,
    email: string,
    password: string,
    role: string,

}

//Userschema
const UserSchema = new Schema<IPosts>({
    name: {
        type: String,

    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,

    },


}, { timestamps: true })
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (enteredPass: string) {
    return await bcrypt.compare(enteredPass, this.password);
}

//creating a model
export const User = model<IPosts>('User', UserSchema)