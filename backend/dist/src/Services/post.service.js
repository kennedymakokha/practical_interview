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
exports.postServices = exports.postService = void 0;
const posts_1 = require("../Models/posts");
class postService {
    //create a post
    createPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPost = yield posts_1.Post.create(data);
                return newPost;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //get all posts
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield posts_1.Post.find({});
                return posts;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //get a single post
    getPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield posts_1.Post.findById({ _id: id });
                if (!post) {
                    return 'post not available';
                }
                return post;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //update a post
    updatePost(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //pass the id of the object you want to update
                //data is for the new body you are updating the old one with
                //new:true, so the dats being returned, is the update one
                const postz = yield posts_1.Post.findByIdAndUpdate({ _id: id }, data, { new: true });
                if (!postz) {
                    return "post not available";
                }
                return postz;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //delete a post by using the find by id and delete 
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield posts_1.Post.findByIdAndDelete(id);
                if (!post) {
                    return 'post not available';
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.postService = postService;
//export the class
exports.postServices = new postService();
