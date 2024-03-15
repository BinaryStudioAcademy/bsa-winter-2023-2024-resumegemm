import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { getViewsCountByUserId } from '~/bundles/resume/store/actions';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';
import { showToast } from '~/bundles/toast/helpers/show-toast';

import { ResumeCard } from '../../components';

const ResumeListPreview: React.FC = () => {
    const dispatch = useAppDispatch();

    const authUser = useAppSelector(({ auth }) => auth.user);

    const resumeViews = useAppSelector(({ resumes }) => resumes.resumeViews);

    useEffect(() => {
        if (authUser) {
            dispatch(getViewsCountByUserId({ userId: authUser.id })).catch(
                (error: Error) => {
                    showToast(error.message, ToastType.ERROR);
                },
            );
        }
    }, [authUser, dispatch]);

    return (
        <>
            {resumeViews.map((resume) => {
                return (
                    <ResumeCard
                        key={resume.resumeId}
                        title={resume.title}
                        image={resume.image}
                        subtitle={`Updated - ${resume.updatedAt}`}
                        viewedResume={resume.views}
                    />
                );
            })}
        </>
    );
};

export { ResumeListPreview };
