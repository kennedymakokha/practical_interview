
//importing modules
import express from "express";
import { SubmissionController } from "../Controllers/submission.controller";
import { isAuth } from "../middlewares/authmiddleware";



//initiating the router
export const router = express.Router()

//add  route
router.post('/', [isAuth], SubmissionController.addsubmission)

//get s
router.get('/', [isAuth], SubmissionController.getsubmissions)

//get single 
router.get('/:id', [isAuth], SubmissionController.getsubmission)

//update a 
router.put('/:id', [isAuth], SubmissionController.updatesubmission)

//delete a 
router.delete('/:id', [isAuth], SubmissionController.deletesubmission)