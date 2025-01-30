"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//importing modules
const express_1 = __importDefault(require("express"));
const submission_controller_1 = require("../Controllers/submission.controller");
const authmiddleware_1 = require("../middlewares/authmiddleware");
//initiating the router
exports.router = express_1.default.Router();
//add  route
exports.router.post('/', [authmiddleware_1.isAuth], submission_controller_1.SubmissionController.addsubmission);
//get s
exports.router.get('/', [authmiddleware_1.isAuth], submission_controller_1.SubmissionController.getsubmissions);
//get single 
exports.router.get('/:id', [authmiddleware_1.isAuth], submission_controller_1.SubmissionController.getsubmission);
//update a 
exports.router.put('/:id', [authmiddleware_1.isAuth], submission_controller_1.SubmissionController.updatesubmission);
//delete a 
exports.router.delete('/:id', [authmiddleware_1.isAuth], submission_controller_1.SubmissionController.deletesubmission);
