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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = require("./../Models/user");
const protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    token = req.cookies.jwt;
    console.log("Token from web", token);
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, "secret");
            req.user = yield user_1.User.findById(decoded.uid).select('-password');
            next();
        }
        catch (error) {
            return res.status(401);
            throw new Error("Unauthorized access- INVALID TOKEN");
        }
    }
    else {
        return res.status(401);
        throw new Error("Unauthorized access- NO TOKEN");
    }
}));
exports.protect = protect;
const isAuth = (req, res, next) => {
    const authorization = req.headers["authorization"];
    if (authorization) {
        const token = authorization.split(" ")[1];
        jsonwebtoken_1.default.verify(token, 'secret', (err, decode) => {
            if (err) {
                return res.status(401).send({ message: 'NOT AUTHORIZED !!!' });
            }
            else {
                req.uid = decode.uid;
                next();
            }
        });
    }
    else {
        return res.status(401).send({ message: 'NOT AUTHORIZED !!!' });
    }
};
exports.isAuth = isAuth;
