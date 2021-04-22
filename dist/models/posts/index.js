"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsQueryParams = void 0;
class PostsQueryParams {
    constructor(args) {
        this.top = args['top'] ? +args['top'] : undefined;
        this['days-prev'] = args['days-prev']
            ? `${+args['days-prev']}daysAgo`
            : '2011-01-01';
    }
}
exports.PostsQueryParams = PostsQueryParams;
