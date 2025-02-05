"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = exports.authorSchemaValidate = void 0;
//importing modules
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
//validation schema
exports.authorSchemaValidate = joi_1.default.object({
    name: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    // email: Joi.string().required(),
});
const authorSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    image: {
        type: String,
    },
}, { timestamps: true });
//creating a model
exports.Author = (0, mongoose_1.model)('author', authorSchema);
