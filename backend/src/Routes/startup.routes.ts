
//importing modules
import express from "express";

import { isAuth } from "../middlewares/authmiddleware";
import { startUpController } from "../Controllers/startup.controller";
import upload from "../../upload";




//initiating the router
export const router = express.Router()

//add  route
router.post('/', upload.single('image'), startUpController.addstartUp)

//get s
router.get('/', startUpController.getstartUps)

//get single 
router.get('/:id', startUpController.getstartUp)
//get single author startups 
router.get('/author/:id', startUpController.getUserstartUps)

//update a 
router.put('/:id', startUpController.updatestartUp)

//delete a 
router.delete('/:id', startUpController.deletestartUp)