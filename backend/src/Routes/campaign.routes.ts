
//importing modules
import express from "express";
import { CampaignController } from "../Controllers/campaign.controller";
import { isAuth } from "../middlewares/authmiddleware";


//initiating the router
export const router = express.Router()

//add  route
router.post('/', [isAuth], CampaignController.addCampaign)

//get s
router.get('/', [isAuth], CampaignController.getCampaigns)

//get single 
router.get('/:id', [isAuth], CampaignController.getCampaign)
//get single 
router.get('/:id/submissions', [isAuth], CampaignController.getSubmissions)
//update a 
router.put('/:id', [isAuth], CampaignController.updateCampaign)

//delete a 
router.delete('/:id', [isAuth], CampaignController.deleteCampain)