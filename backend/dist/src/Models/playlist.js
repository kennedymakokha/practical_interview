"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
//importing modules
const mongoose_1 = require("mongoose");
const selectSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    slug: {
        type: String,
    },
    select: {
        type: [
            { type: mongoose_1.Schema.Types.ObjectId, ref: 'startup' }
        ],
    },
}, { timestamps: true });
//creating a model
exports.Select = (0, mongoose_1.model)('select', selectSchema);
