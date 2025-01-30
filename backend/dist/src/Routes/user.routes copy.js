"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//importing modules
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../Controllers/user.controller");
//initiating the router
exports.router = express_1.default.Router();
//add post route
exports.router.post('/', user_controller_1.UserController.adduser);
//get posts
exports.router.get('/', user_controller_1.UserController.getPosts);
//get single post
exports.router.get('/:id', user_controller_1.UserController.getAuser);
//update a post
exports.router.put('/:id', user_controller_1.UserController.updateuser);
//delete a post
exports.router.delete('/:id', user_controller_1.UserController.deleteuser);
