"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gaService = void 0;
const googleapis_1 = require("googleapis");
const utils_1 = require("../../utils");
class gaService {
    constructor() { }
}
exports.gaService = gaService;
gaService.getPosts = async (params) => {
    const gaJWTAuth = new googleapis_1.google.auth.JWT(process.env.GA_CLIENT_EMAIL, undefined, utils_1.getPrivKeyFormatted(process.env.GA_PRIVATE_KEY), ['https://www.googleapis.com/auth/analytics.readonly']);
    try {
        const analyticsReporting = googleapis_1.google.analyticsreporting({
            version: 'v4',
            auth: gaJWTAuth,
        });
        const result = await analyticsReporting.reports.batchGet({
            requestBody: {
                reportRequests: [
                    {
                        viewId: 'ga:227260144',
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
        const data = result.data.reports[0].data;
        const posts = data.rows.map((post) => {
            const { dimensions, metrics } = post;
            const path = dimensions[0];
            const title = dimensions[1];
            return [path, title];
        });
        const gaGetPostsDetail = {
            rows: posts,
        };
        return {
            isSuccess: true,
            type: 'getPosts',
            body: gaGetPostsDetail,
        };
    }
    catch (err) {
        return {
            isSuccess: false,
            type: 'getPosts',
            body: 'Error retrieving data from Google Analytics. Call for help',
        };
    }
};
