"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Submission = exports.submissionSchemaValidate = void 0;
//importing modules
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
//validation schema
exports.submissionSchemaValidate = joi_1.default.object({
    links: joi_1.default.array().required(),
    description: joi_1.default.string().required(),
    campaignID: joi_1.default.string().required(),
});
const submissionSchema = new mongoose_1.Schema({
    links: {
        type: Array,
    },
    description: {
        type: String,
    },
    approved: {
        type: Boolean,
        default: null
    },
    campaignID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Campaign' },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
//creating a model
exports.Submission = (0, mongoose_1.model)('Submission', submissionSchema);
