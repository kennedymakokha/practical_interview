"use strict";
//import modules
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignController = void 0;
const campaign_1 = require("../Models/campaign");
class campaignController {
    constructor() {
       
        this.addCampaign = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = req.body;
               ;
                //validating the request
                const { error, value } = campaign_1.campaignSchemaValidate.validate(req.body);
                if (error) {
                    res.status(400).json({ message: error.message });
                }
                else {
                    const newcampaign = yield campaign_1.Campaign.create(value);
                    res.status(200).json({ message: 'Success', newcampaign });
                }
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
            //data to be saved in database
        });
        this.getCampaigns = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaign = yield campaign_1.Campaign.find();
                console.log(campaign);
                res.status(200).json({ message: 'Success', campaign });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        this.getCampaign = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const campaign = yield campaign_1.Campaign.findById(id);
                res.status(200).json({ message: 'Success', campaign });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        //updat
        this.updateCampaign = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const campaign = yield campaign_1.Campaign.findByIdAndUpdate(id, req.body);
                res.status(200).json({ message: 'Success', campaign });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        //delete 
        this.deleteCampain = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const campaign = yield campaign_1.Campaign.findByIdAndDelete(id);
                res.status(200).json({ message: 'Success', campaign });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
}
//export class
exports.CampaignController = new campaignController();
