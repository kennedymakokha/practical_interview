"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//importing modules
const express_1 = __importDefault(require("express"));
const campaign_controller_1 = require("../Controllers/campaign.controller");
const authmiddleware_1 = require("../middlewares/authmiddleware");
//initiating the router
exports.router = express_1.default.Router();
//add  route
exports.router.post('/', [authmiddleware_1.isAuth], campaign_controller_1.CampaignController.addCampaign);
//get s
exports.router.get('/', [authmiddleware_1.isAuth], campaign_controller_1.CampaignController.getCampaigns);
//get single 
exports.router.get('/:id', [authmiddleware_1.isAuth], campaign_controller_1.CampaignController.getCampaign);
//get single 
exports.router.get('/:id/submissions', [authmiddleware_1.isAuth], campaign_controller_1.CampaignController.getSubmissions);
//update a 
exports.router.put('/:id', [authmiddleware_1.isAuth], campaign_controller_1.CampaignController.updateCampaign);
//delete a 
exports.router.delete('/:id', [authmiddleware_1.isAuth], campaign_controller_1.CampaignController.deleteCampain);
