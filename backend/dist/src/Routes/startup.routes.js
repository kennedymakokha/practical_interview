"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//importing modules
const express_1 = __importDefault(require("express"));
const authmiddleware_1 = require("../middlewares/authmiddleware");
const startup_controller_1 = require("../Controllers/startup.controller");
const upload_1 = __importDefault(require("../../upload"));
//initiating the router
exports.router = express_1.default.Router();
//add  route
exports.router.post('/', upload_1.default.single('image'), startup_controller_1.startUpController.addstartUp);
//get s
exports.router.get('/', startup_controller_1.startUpController.getstartUps);
//get single 
exports.router.get('/:id', [authmiddleware_1.isAuth], startup_controller_1.startUpController.getstartUp);
//update a 
exports.router.put('/:id', [authmiddleware_1.isAuth], startup_controller_1.startUpController.updatestartUp);
//delete a 
exports.router.delete('/:id', [authmiddleware_1.isAuth], startup_controller_1.startUpController.deletestartUp);
