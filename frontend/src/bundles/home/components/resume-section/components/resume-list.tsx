import { NavLink } from 'react-router-dom';

import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useResumes,
} from '~/bundles/common/hooks/hooks';
import { actions as resumeActions } from '~/bundles/resume/store/resume.store';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';
import { showToast } from '~/bundles/toast/helpers/show-toast';

import { ResumeCard } from '../../components';

const ResumeList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { deleteResume } = useResumes();

    const { authUser, resumeViews } = useAppSelector(({ auth, resumes }) => ({
        authUser: auth.user,
        resumeViews: resumes.resumeViews,
    }));

    useEffect(() => {
        if (authUser) {
            dispatch(resumeActions.getViewsCountByUserId()).catch(
                (error: Error) => {
                    showToast(error.message, ToastType.ERROR);
                },
            );
        }
    }, [authUser, dispatch]);

    return (
        <>
            {resumeViews.map(({ resumeId, title, image, updatedAt, views }) => {
                return (
                    <NavLink key={resumeId} to={`/resumes/${resumeId}`}>
                        <ResumeCard
                            key={resumeId}
                            title={title}
                            image={image}
                            subtitle={`Updated - ${updatedAt}`}
                            viewedResume={views}
                            onDelete={deleteResume}
                        />
                    </NavLink>
                );
            })}
        </>
    );
};

export { ResumeList };
