import { type OrderByDirection } from 'objection';

type RecentlyViewedQuery = {
    limit: number;
    direction?: OrderByDirection | undefined;
    name?: string | undefined;
};

export { type RecentlyViewedQuery };
