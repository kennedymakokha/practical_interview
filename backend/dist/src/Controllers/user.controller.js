"use strict";
//import modules
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = require("../Models/user");
const user_2 = require("../Models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class userController {
    constructor() {
        //add post controller
        this.adduser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    name: req.body.name,
                    email: req.body.email,
                    role: req.body.role,
                    password: req.body.password,
                };
                //validating the request
                const { error, value } = user_1.UserschemaValidate.validate(data);
                if (error) {
                    res.status(400).json({ message: error.message });
                }
                else {
                    const newUser = yield user_2.User.create(value);
                    res.status(200).json({ message: 'Success', newUser });
                }
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
            //data to be saved in database
        });
        this.loginuser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_2.User.findOne({
                    email: req.body.email,
                    // deleted_at: null,
                });
                if (!user) {
                    res
                        .status(400)
                        .json({ success: false, message: "User Does Not Exist !" });
                }
                const isEqual = yield bcryptjs_1.default.compare(req.body.password, user.password);
                if (!isEqual) {
                    res.status(400)
                        .json({ success: false, message: "Password is Incorrect !" });
                }
                const iat = Math.floor(Date.now() / 1000);
                // Expires After 2 Hours
                const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 2;
                const token = jsonwebtoken_1.default.sign({
                    iat: iat,
                    exp: exp,
                    uid: user._id,
                }, "secret");
                res.status(200).json({ message: 'Success', user, token });
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_2.User.find();
                console.log(user);
                res.status(200).json({ message: 'Success', user });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        this.getAuser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_2.User.findById(req.uid);
                res.status(200).json({ message: 'Success', user });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        //update post
        this.updateuser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield user_2.User.findByIdAndUpdate(id, req.body);
                res.status(200).json({ message: 'Success', user });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        //delete a post
        this.deleteuser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield user_2.User.findByIdAndDelete(id);
                res.status(200).json({ message: 'Success', user });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
}
//export class
exports.UserController = new userController();
