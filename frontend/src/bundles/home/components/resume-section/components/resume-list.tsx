import { NavLink } from 'react-router-dom';

import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { getViewsCountByUserId } from '~/bundles/resume/store/actions';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';
import { showToast } from '~/bundles/toast/helpers/show-toast';

import { ResumeCard } from '../../components';

const ResumeList: React.FC = () => {
    const dispatch = useAppDispatch();

    const authUser = useAppSelector(({ auth }) => auth.user);

    const resumeViews = useAppSelector(({ resumes }) => resumes.resumeViews);

    useEffect(() => {
        if (authUser) {
            dispatch(getViewsCountByUserId()).catch((error: Error) => {
                showToast(error.message, ToastType.ERROR);
            });
        }
    }, [authUser, dispatch]);

    return (
        <>
            {resumeViews.map((resume) => {
                return (
                    <NavLink
                        key={resume.resumeId}
                        to={`/resumes/${resume.resumeId}`}
                    >
                        <ResumeCard
                            key={resume.resumeId}
                            title={resume.title}
                            image={resume.image}
                            subtitle={`Updated - ${resume.updatedAt}`}
                            resumeViews={resume.views}
                        />
                    </NavLink>
                );
            })}
        </>
    );
};

export { ResumeList };
