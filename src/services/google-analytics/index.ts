import { google } from 'googleapis';
import { GAGetPostsResponse, GAGetPostsDetail } from '../../ts-api';
import { PostsQueryParams } from '../../models/posts';
import { getPrivKeyFormatted } from '../../utils';

export class gaService {
  static getPosts = async (params: PostsQueryParams) => {
    const gaJWTAuth = new google.auth.JWT(
      process.env.GA_CLIENT_EMAIL,
      undefined,
      getPrivKeyFormatted(process.env.GA_PRIVATE_KEY as string),
      ['https://www.googleapis.com/auth/analytics.readonly'],
    );

    try {
      const analyticsReporting = google.analyticsreporting({
        version: 'v4',
        auth: gaJWTAuth,
      });

      const result = await analyticsReporting.reports.batchGet({
        requestBody: {
          reportRequests: [
            {
              viewId: 'ga:00000000',
              dateRanges: [
                {
                  startDate: params['days-prev'],
                  endDate: 'today',
                },
              ],
              metrics: [
                {
                  expression: 'ga:pageviews',
                },
              ],
              dimensions: [
                {
                  name: 'ga:pagePath',
                },
                {
                  name: 'ga:pageTitle',
                },
              ],
              orderBys: [
                {
                  sortOrder: 'DESCENDING',
                  fieldName: 'ga:pageviews',
                },
              ],
              /* 
                Comment or update the dimensionFilterClauses array otherwise it will only show results
                where path contains slug /blog/
              */
              dimensionFilterClauses: [
                {
                  filters: [
                    {
                      dimensionName: 'ga:pagePath',
                      operator: 'REGEXP',
                      expressions: ['/blog/'],
                    },
                  ],
                },
              ],
              pageSize: params.top,
            },
          ],
        },
      });

      const data = result.data.reports![0].data;

      const posts = data!.rows!.map((post) => {
        const { dimensions, metrics } = post;

        const path = dimensions![0];
        const title = dimensions![1];
        // const views = metrics![0].values![0];

        return [path, title];
      });

      const gaGetPostsDetail: GAGetPostsDetail = {
        // totalsForAllResults: data?.totals![0].values![0],
        rows: posts,
      };

      return {
        isSuccess: true,
        type: 'getPosts',
        body: gaGetPostsDetail,
      } as GAGetPostsResponse;
    } catch (err) {
      return {
        isSuccess: false,
        type: 'getPosts',
        body: 'Error retrieving data from Google Analytics. Call for help',
      } as GAGetPostsResponse;
    }
  };
}
