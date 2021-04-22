"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const posts_router_1 = __importDefault(require("./router/posts-router"));
dotenv_1.default.config();
const app = express_1.default();
app.use(helmet_1.default());
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
app.use('/api', posts_router_1.default);
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.code || 500);
    res.json({ message: err.message || 'An error happened. Fix your bugs!' });
});
if (process.env.NODE_ENV !== 'development') {
    https_1.default
        .createServer({
        key: fs_1.default.readFileSync(__dirname + '/../../secretstuff/privkey.pem'),
        cert: fs_1.default.readFileSync(__dirname + '/../../secretstuff/cert.pem'),
    }, app)
        .listen(process.env.PORT);
}
else {
    app.listen(process.env.PORT);
}
