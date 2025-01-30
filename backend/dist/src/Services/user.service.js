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
exports.Userservices = exports.Userservice = void 0;
// import module
const user_1 = require("../Models/user");
class Userservice {
    //create a User
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user_1.User.create(data);
                return newUser;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //get all Users
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Users = yield user_1.User.find({});
                return Users;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //get a single User
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Uzer = yield user_1.User.findById({ _id: id });
                if (!Uzer) {
                    return 'post not available';
                }
                return Uzer;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //update a post
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //pass the id of the object you want to update
                //data is for the new body you are updating the old one with
                //new:true, so the dats being returned, is the update one
                const Userz = yield user_1.User.findByIdAndUpdate({ _id: id }, data, { new: true });
                if (!Userz) {
                    return "User not available";
                }
                return Userz;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //delete a User by using the find by id and delete 
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Uzer = yield user_1.User.findByIdAndDelete(id);
                if (!Uzer) {
                    return 'User not available';
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.Userservice = Userservice;
//export the class
exports.Userservices = new Userservice();
