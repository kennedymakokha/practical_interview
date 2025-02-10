"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = require("./src/Config/db.config");
const user_routes_1 = require("./src/Routes/user.routes");
const campaign_routes_1 = require("./src/Routes/campaign.routes");
const submissions_routes_1 = require("./src/Routes/submissions.routes");
const author_routes_1 = require("./src/Routes/author.routes");
const startup_routes_1 = require("./src/Routes/startup.routes");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use('/api/v1/user', user_routes_1.router);
app.use('/api/v1/campaign', campaign_routes_1.router);
app.use('/api/v1/submissions', submissions_routes_1.router);
app.use('/api/v1/author', author_routes_1.router);
app.use('/api/v1/startup', startup_routes_1.router);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
db_config_1.db.then(() => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});
