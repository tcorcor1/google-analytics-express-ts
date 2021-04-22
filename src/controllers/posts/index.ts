import { Request, Response, NextFunction } from 'express';
import { gaService } from '../../services/google-analytics';
import { HttpException } from '../../models/exceptions';
import { PostsQueryParams } from '../../models/posts';
import { GAGetPostsResponse } from '../../ts-api';

export class PostsController {
  static getPosts = async (req: Request, res: Response, next: NextFunction) => {
    const postsQueryParams = new PostsQueryParams(req.query);

    const postsResponse: GAGetPostsResponse = await gaService.getPosts(
      postsQueryParams,
    );

    if (!postsResponse.isSuccess) {
      return next(new HttpException(404, postsResponse.body as string));
    }

    res.status(200).json(postsResponse.body);
  };
}
