"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//importing modules
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../Controllers/post.controller");
//initiating the router
exports.router = express_1.default.Router();
//add post route
exports.router.post('/', post_controller_1.PostController.addpost);
//get posts
exports.router.get('/', post_controller_1.PostController.getPosts);
//get single post
exports.router.get('/:id', post_controller_1.PostController.getAPost);
//update a post
exports.router.put('/:id', post_controller_1.PostController.updatePost);
//delete a post
exports.router.delete('/:id', post_controller_1.PostController.deletePost);
