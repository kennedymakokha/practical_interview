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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorController = void 0;
const author_1 = require("../Models/author");
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
                const id = req.params.id;
                const author = yield author_1.Author.findById(id);
                res.status(200).json({ message: 'Success', author });
            }
            catch (error) {
                res.status(400).json(error);
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
