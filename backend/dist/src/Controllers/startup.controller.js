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
                //validating the request
                req.body.slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
                const { error, value } = startup_1.startUpSchemaValidate.validate(req.body);
                if (error) {
                    res.status(400).json({ message: error.message });
                }
                else {
                    const newstartUp = yield startup_1.StartUp.create(Object.assign({}, value));
                    res.status(200).json({ message: 'Success', newstartUp });
                }
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
        this.getstartUps = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const startUp = yield startup_1.StartUp.find();
                res.status(200).json({ message: 'Success', startUp });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
        this.getstartUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const startUp = yield startup_1.StartUp.findById(id);
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
