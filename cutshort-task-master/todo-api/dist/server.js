"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
require("dotenv").config();
const index_1 = __importDefault(require("./src/index"));
const PORT = process.env.PORT || 3000;
// Uncaught exception error handling
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION: Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
console.log("Current environment is:", process.env.NODE_ENV);
mongoose
    .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB...", err));
const server = index_1.default.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
process.on("unhandledRejection", (ex) => {
    console.log("We got an unhandled rejection");
    console.log(ex.name, ex.message);
    server.close(() => {
        process.exit(1);
    });
    // throw ex;
});
//# sourceMappingURL=server.js.map