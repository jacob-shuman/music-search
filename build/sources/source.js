"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SourceResult {
    constructor(options) {
        this.source = options.source;
        this.result = options.result;
        this.success = options.success || false;
    }
}
exports.SourceResult = SourceResult;
