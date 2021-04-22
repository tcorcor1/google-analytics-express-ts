"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const google_analytics_1 = require("../../services/google-analytics");
const exceptions_1 = require("../../models/exceptions");
const posts_1 = require("../../models/posts");
class PostsController {
    constructor() { }
}
exports.PostsController = PostsController;
PostsController.getPosts = async (req, res, next) => {
    const postsQueryParams = new posts_1.PostsQueryParams(req.query);
    const postsResponse = await google_analytics_1.gaService.getPosts(postsQueryParams);
    if (!postsResponse.isSuccess) {
        return next(new exceptions_1.HttpException(404, postsResponse.body));
    }
    res.status(200).json(postsResponse.body);
};
