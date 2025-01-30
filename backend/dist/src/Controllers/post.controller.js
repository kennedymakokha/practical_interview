"use strict";
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
exports.PostController = void 0;
//import modules
const post_service_1 = require("../Services/post.service");
const posts_1 = require("../Models/posts");
class postController {
    constructor() {
        //add post controller
        this.addpost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //data to be saved in database
            const data = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                published: req.body.published
            };
            //validating the request
            const { error, value } = posts_1.PostschemaValidate.validate(data);
            if (error) {
                res.send(error.message);
            }
            else {
                //call the create post function in the service and pass the data from the request
                const post = yield post_service_1.postServices.createPost(value);
                res.status(201).send(post);
            }
        });
        //get all posts
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_service_1.postServices.getPosts();
            res.send(posts);
        });
        //get a single post
        this.getAPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //get id from the parameter
            const id = req.params.id;
            const post = yield post_service_1.postServices.getPost(id);
            res.send(post);
        });
        //update post
        this.updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const post = yield post_service_1.postServices.updatePost(id, req.body);
            res.send(post);
        });
        //delete a post
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield post_service_1.postServices.deletePost(id);
            res.send('post deleted');
        });
    }
}
//export class
exports.PostController = new postController();
