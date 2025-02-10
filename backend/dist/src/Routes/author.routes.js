"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//importing modules
const express_1 = __importDefault(require("express"));
const authmiddleware_1 = require("../middlewares/authmiddleware");
const author_controller_1 = require("../Controllers/author.controller");
//initiating the router
exports.router = express_1.default.Router();
//add  route
exports.router.post('/', author_controller_1.authorController.addauthor);
//get s
exports.router.get('/', author_controller_1.authorController.getauthors);
//get single 
exports.router.get('/:id', author_controller_1.authorController.getauthor);
//login autor  single 
exports.router.post('/:id', author_controller_1.authorController.loginauthor);
//update a 
exports.router.put('/:id', [authmiddleware_1.isAuth], author_controller_1.authorController.updateauthor);
//delete a 
exports.router.delete('/:id', [authmiddleware_1.isAuth], author_controller_1.authorController.deleteauthor);
