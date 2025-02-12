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
exports.startUpController = void 0;
const startup_1 = require("../Models/startup");
class startUpcontroller {
    constructor() {
        this.addstartUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                //validating the request
                // if (!req.file) {
                //     res.status(400).send('No file uploaded');
                // }
                // Construct the image URL
                // const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
                req.body.slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
                req.body.image = "http://localhost:8000/uploads/1738926242837.jpg";
                req.body.author = "67a4c88574993ee5993de31b";
                const { error, value } = startup_1.startUpSchemaValidate.validate(req.body);
                if (error) {
                    res.status(400).json({ message: error.message });
                }
                else {
                    const newstartUp = yield startup_1.StartUp.create(Object.assign({}, value));
                    res.status(200).json(newstartUp);
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: error });
            }
        });
        this.getstartUps = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { search, id } = req.query;
                let options = {};
                if (search === 'null' || search === undefined) {
                    options = {};
                }
                else {
                    var searchKey = new RegExp(`${search}`, 'i');
                    options = { $or: [{ title: searchKey }, { category: searchKey }, { description: searchKey }], deletedAt: null };
                }
                const startUp = yield startup_1.StartUp.find(options).populate('author');
                res.status(200).json({ message: 'Success', startUp });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        this.getUserstartUps = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(id);
                const startUp = yield startup_1.StartUp.find({ author: id, deletedAt: null }).populate('author');
                res.status(200).json({ message: 'Success', startUp });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        this.getstartUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { views } = req.query;
            try {
                const id = req.params.id;
                let startUp = undefined;
                yield startup_1.StartUp.findById(id).populate('author');
                if (views) {
                    startUp = yield startup_1.StartUp.findById(id).select('views');
                }
                else {
                    startUp = yield startup_1.StartUp.findById(id).populate('author');
                }
                res.status(200).json({ message: 'Success', startUp });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        //updat
        this.updatestartUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const startUp = yield startup_1.StartUp.findByIdAndUpdate(id, req.body);
                res.status(200).json({ message: 'Success', startUp });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        //delete 
        this.deletestartUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const startUp = yield startup_1.StartUp.findByIdAndDelete(id);
                res.status(200).json({ message: 'Success', startUp });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
}
//export class
exports.startUpController = new startUpcontroller();
