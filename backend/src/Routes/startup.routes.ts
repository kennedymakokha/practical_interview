
//importing modules
import express from "express";

import { isAuth } from "../middlewares/authmiddleware";
import { startUpController } from "../Controllers/startup.controller";




//initiating the router
export const router = express.Router()

//add  route
router.post('/',  startUpController.addstartUp)

//get s
router.get('/', startUpController.getstartUps)

//get single 
router.get('/:id', [isAuth], startUpController.getstartUp)

//update a 
router.put('/:id', [isAuth], startUpController.updatestartUp)

//delete a 
router.delete('/:id', [isAuth], startUpController.deletestartUp)