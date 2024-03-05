import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { ResumeCard } from '~/bundles/home/components/components';
import { actions as recentlyViewedActionCreator } from '~/bundles/recently-viewed/store/';

const RecentlyViewedTemplates: React.FC = () => {
    const dispatch = useAppDispatch();
    const { recentlyViewedTemplates } = useAppSelector(
        ({ recentlyViewed }) => ({
            recentlyViewedTemplates: recentlyViewed.recentlyViewedTemplates,
        }),
    );

    const loadRecentlyViewedTemplates = useCallback(() => {
        void dispatch(recentlyViewedActionCreator.getRecentlyViewedTemplates());
    }, [dispatch]);

    useEffect(() => {
        loadRecentlyViewedTemplates();
    }, [loadRecentlyViewedTemplates]);

    return (
        <>
            {recentlyViewedTemplates.length > 0 &&
                recentlyViewedTemplates.map((recentlyViewed) => {
                    return (
                        <ResumeCard
                            key={recentlyViewed.templateId}
                            title={recentlyViewed.resumeTitle}
                            image={recentlyViewed.template.image}
                        />
                    );
                })
            }
        </>
    );
};

export { RecentlyViewedTemplates };
