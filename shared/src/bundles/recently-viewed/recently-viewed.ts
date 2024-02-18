enum RecentlyViewedApiPath {
    ROOT = '/',
    ID = '/:id',
    RECENTLY_VIEWED_RESUMES = '/resumes',
    RECENTLY_VIEWED_TEMPLATES = '/templates',
}

export { RecentlyViewedApiPath };
export {
    type RecentlyViewed,
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
} from './types/types';
