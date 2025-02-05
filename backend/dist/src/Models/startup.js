"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartUp = exports.startUpSchemaValidate = void 0;
//importing modules
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
//validation schema
exports.startUpSchemaValidate = joi_1.default.object({
    title: joi_1.default.string().required(),
    views: joi_1.default.number(),
    description: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
    slug: joi_1.default.string().required(),
    pitch: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
});
const startupSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    views: {
        type: Number,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'startup' },
}, { timestamps: true });
//creating a model
exports.StartUp = (0, mongoose_1.model)('startup', startupSchema);
