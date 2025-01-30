
//importing modules
import express from "express";
import { UserController } from '../Controllers/user.controller'
import { isAuth } from "../middlewares/authmiddleware";

//initiating the router
export const router = express.Router()

//add post route
router.post('/', UserController.adduser)
router.post('/login', UserController.loginuser)


router.get('/', [isAuth], UserController.getAuser)

//update a post
router.put('/:id', UserController.updateuser)

//delete a post
router.delete('/:id', UserController.deleteuser)