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
const user_1 = require("../Models/user");
const submission_1 = require("../Models/submission");
class campaignController {
    constructor() {
        this.addCampaign = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findById(req.uid);
                if (!user || user.role !== "campaigner") {
                    return res.status(403).json({ message: "Not Authorized to create a campaign" });
                }
                //validating the request
                const { error, value } = campaign_1.campaignSchemaValidate.validate(req.body);
                if (error) {
                    res.status(400).json({ message: error.message });
                }
                else {
                    const newcampaign = yield new campaign_1.Campaign(Object.assign(Object.assign({}, value), { createdBy: req.uid })).save();
                    console.log(newcampaign);
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
                let options = {};
                const user = yield user_1.User.findById(req.uid);
                if (!user) {
                    return res.status(403).json({ message: "Not Authorized " });
                }
                // if (user.role === "campaigner") {
                //     options.createdBy = req.uid
                // } else {
                //     options.state = { $in: ['launched', 'completed'] }
                // }
                // await Campaign.find(options)
                const campaign = yield campaign_1.Campaign.aggregate([
                    {
                        $match: options,
                    },
                    {
                        $lookup: {
                            from: "submissions", // the collection name of the CategoryImage model
                            localField: "_id", // field in Category that matches with foreignField
                            foreignField: "campaignID", // field in CategoryImage that references Category
                            as: "submissions", // alias for the joined images
                        },
                    },
                ]).exec();
                console.log("second", campaign);
                res.status(200).json({ message: 'Success', campaign });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        this.getSubmissions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const submissions = yield submission_1.Submission.find({ campaignID: req.params.id }).populate("campaignID");
                res.status(200).json({ message: 'Success', submissions });
            }
            catch (error) {
                console.log(error);
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
