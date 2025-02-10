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
exports.authorController = void 0;
const author_1 = require("../Models/author");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { Author, authorSchemaValidate } from '../Models/author'
class authorcontroller {
    constructor() {
        this.addauthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //validating the request
                const { error, value } = author_1.authorSchemaValidate.validate(req.body);
                const newauthor = yield author_1.Author.create(Object.assign({}, value));
                res.status(200).json({ message: 'Success', newauthor });
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
        this.getauthors = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const author = yield author_1.Author.find();
                res.status(200).json({ message: 'Success', author });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        this.getauthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let author = null;
                const id = req.params.id;
                if (req.query.auth) {
                    author = yield author_1.Author.findOne({ $or: [{ id: id }] });
                }
                author = yield author_1.Author.findById(id);
                res.status(200).json({ message: 'Success', author });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        this.loginauthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Token Generation");
            try {
                const { id } = req.query;
                const author = yield author_1.Author.findOne({ $or: [{ id: id }] });
                // if (!user) {
                //      res
                //         .status(400)
                //         .json({ success: false, message: "User Does Not Exist !" });
                // }
                // const isEqual = await bcrypt.compare(req.body.password, user.password);
                // if (!isEqual) {
                //      res.status(400)
                //         .json({ success: false, message: "Password is Incorrect !" });
                // }
                const iat = Math.floor(Date.now() / 1000);
                // Expires After 2 Hours
                const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 2;
                const token = jsonwebtoken_1.default.sign({
                    iat: iat,
                    exp: exp,
                    uid: author === null || author === void 0 ? void 0 : author._id,
                }, "secret");
                res.status(200).json({ message: 'Success', author, token, exp });
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
        //updat
        this.updateauthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const author = yield author_1.Author.findByIdAndUpdate(id, req.body);
                res.status(200).json({ message: 'Success', author });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        //delete 
        this.deleteauthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const author = yield author_1.Author.findByIdAndDelete(id);
                res.status(200).json({ message: 'Success', author });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
}
//export class
exports.authorController = new authorcontroller();
