export type GAPostsQueryArgs = {
  top?: number;
  'days-prev'?: string;
};

export type GAGetPostsDetail = {
  totalsForAllResults?: string | null | undefined;
  rows: string[][] | null | undefined;
};

export type GAGetPostsResponse = {
  isSuccess: boolean;
  type: string;
  body: GAGetPostsDetail | string;
};
