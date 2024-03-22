import { useSearchParams } from 'react-router-dom';
import { SearchParameters } from 'shared/build';

import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { ResumeCard } from '~/bundles/home/components/components';
import { actions as recentlyViewedActionCreator } from '~/bundles/recently-viewed/store/';

const RecentlyViewedResumes: React.FC = () => {
    const dispatch = useAppDispatch();
    const [searchParameters] = useSearchParams();

    const recentlyViewedResumeName =
        searchParameters.get(SearchParameters.RECENTLY_VIEWED_RESUME_NAME) ??
        '';

    const { recentlyViewedResumes } = useAppSelector(({ recentlyViewed }) => ({
        recentlyViewedResumes: recentlyViewed.recentlyViewedResumes,
    }));

    const loadRecentlyViewedResumes = useCallback(() => {
        void dispatch(
            recentlyViewedActionCreator.getRecentlyViewedResumes({
                name: recentlyViewedResumeName,
            }),
        );
    }, [dispatch, recentlyViewedResumeName]);

    useEffect(() => {
        loadRecentlyViewedResumes();
    }, [loadRecentlyViewedResumes]);

    return (
        <>
            {recentlyViewedResumes.length > 0 &&
                recentlyViewedResumes
                    .filter((recentlyViewed) => recentlyViewed.resumes)
                    .map((recentlyViewed) => {
                        return (
                            <ResumeCard
                                key={recentlyViewed.id}
                                title={recentlyViewed.resumes.resumeTitle ?? ''}
                                image={recentlyViewed.resumes.image}
                            />
                        );
                    })}
        </>
    );
};

export { RecentlyViewedResumes };
