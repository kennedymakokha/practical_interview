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
exports.SubmissionController = void 0;
const submission_1 = require("../Models/submission");
const campaign_1 = require("../Models/campaign");
const user_1 = require("../Models/user");
class submissioncontroller {
    constructor() {
        this.addsubmission = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findById(req.uid);
                if (!user || user.role !== "influencer") {
                    return res.status(403).json({ message: "Not Authorized to create a campaign submission" });
                }
                //validating the request
                const { error, value } = submission_1.submissionSchemaValidate.validate(req.body);
                if (error) {
                    res.status(400).json({ message: error.message });
                }
                else {
                    const campaign = campaign_1.Campaign.findById(req.body.campaignID);
                    if (!campaign) {
                        return res.status(403).json({ message: "Campaign does Not Exist" });
                    }
                    const newsubmission = yield submission_1.Submission.create(Object.assign(Object.assign({}, value), { createdBy: req.uid }));
                    // const submission = await Campaign.findByIdAndUpdate(req.body.campaignID, { state: "pending-approval" })
                    res.status(200).json({ message: 'Success', newsubmission });
                }
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
            //data to be saved in database
        });
        this.getsubmissions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const submission = yield submission_1.Submission.find();
                res.status(200).json({ message: 'Success', submission });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        this.getsubmission = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const submission = yield submission_1.Submission.findById(id);
                res.status(200).json({ message: 'Success', submission });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        //updat
        this.updatesubmission = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const submission = yield submission_1.Submission.findByIdAndUpdate(id, req.body);
                res.status(200).json({ message: 'Success', submission });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        //delete 
        this.deletesubmission = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const submission = yield submission_1.Submission.findByIdAndDelete(id);
                res.status(200).json({ message: 'Success', submission });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
}
//export class
exports.SubmissionController = new submissioncontroller();
