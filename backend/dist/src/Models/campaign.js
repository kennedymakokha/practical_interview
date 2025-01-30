"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Campaign = exports.campaignSchemaValidate = void 0;
//importing modules
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
//validation schema
exports.campaignSchemaValidate = joi_1.default.object({
    name: joi_1.default.string().required(),
    link: joi_1.default.string(),
    budget: joi_1.default.string(),
    description: joi_1.default.string().required(),
    start: joi_1.default.string().required(),
    end: joi_1.default.string().required(),
});
const campaignSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    deletedAt: {
        type: String,
        default: null
    },
    budget: {
        type: String,
    },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    start: {
        type: String,
    },
    end: {
        type: String,
    },
    link: {
        type: String,
    },
    state: {
        type: String,
        enum: ["scheduled", "launched", "completed"],
        default: "scheduled"
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });
//creating a model
exports.Campaign = (0, mongoose_1.model)('Campaign', campaignSchema);
