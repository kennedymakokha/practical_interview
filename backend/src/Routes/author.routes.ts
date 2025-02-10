
//importing modules
import express from "express";

import { isAuth } from "../middlewares/authmiddleware";
import { authorController } from "../Controllers/author.controller";



//initiating the router
export const router = express.Router()

//add  route
router.post('/',  authorController.addauthor)

//get s
router.get('/', authorController.getauthors)

//get single 
router.get('/:id', authorController.getauthor)

//login autor  single 
router.post('/:id', authorController.loginauthor)

//update a 
router.put('/:id', [isAuth], authorController.updateauthor)

//delete a 
router.delete('/:id', [isAuth], authorController.deleteauthor)