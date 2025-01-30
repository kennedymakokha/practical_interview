"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//importing modules
const express_1 = __importDefault(require("express"));
const campaign_controller_1 = require("../Controllers/campaign.controller");
//initiating the router
exports.router = express_1.default.Router();
//add  route
exports.router.post('/', campaign_controller_1.CampaignController.addCampaign);
//get s
exports.router.get('/', campaign_controller_1.CampaignController.getCampaigns);
//get single 
exports.router.get('/:id', campaign_controller_1.CampaignController.getCampaign);
//update a 
exports.router.put('/:id', campaign_controller_1.CampaignController.updateCampaign);
//delete a 
exports.router.delete('/:id', campaign_controller_1.CampaignController.deleteCampain);
