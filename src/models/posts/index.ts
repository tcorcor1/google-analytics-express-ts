import { GAPostsQueryArgs } from '../../ts-api';

export class PostsQueryParams {
  public top: number | undefined;
  public 'days-prev': string | undefined;

  constructor(args: GAPostsQueryArgs) {
    this.top = args['top'] ? +args['top'] : undefined;
    this['days-prev'] = args['days-prev']
      ? `${+args['days-prev']}daysAgo`
      : '2011-01-01'; // some date when you started tracking data as a fallback
  }
}
