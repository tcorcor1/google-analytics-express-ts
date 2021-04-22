"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrivKeyFormatted = void 0;
const getPrivKeyFormatted = (envVar) => {
    return envVar.replace(/\\n/g, '\n');
};
exports.getPrivKeyFormatted = getPrivKeyFormatted;
