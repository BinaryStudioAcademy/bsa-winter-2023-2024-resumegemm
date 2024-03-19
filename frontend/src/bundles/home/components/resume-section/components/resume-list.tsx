import { NavLink } from 'react-router-dom';

import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { actions as resumeActions } from '~/bundles/resume/store/resume.store';
import { CommonMessage } from '~/bundles/toast/enums/common-message.enum';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';
import { showToast } from '~/bundles/toast/helpers/show-toast';

import { ResumeCard } from '../../components';

const ResumeList: React.FC = () => {
    const dispatch = useAppDispatch();

    const { resumeViews } = useAppSelector(({ resumes }) => ({
        resumeViews: resumes.resumeViews,
    }));

    const deleteResume = useCallback(
        (resumeId: string) => {
            void dispatch(resumeActions.deleteResume(resumeId))
                .unwrap()
                .then(() =>
                    showToast(
                        CommonMessage.SUCCESS_DELETE_RESUME,
                        ToastType.INFO,
                        {
                            position: 'top-right',
                        },
                    ),
                );
        },
        [dispatch],
    );

    useEffect(() => {
        dispatch(resumeActions.getViewsCountByUserId()).catch(
            (error: Error) => {
                showToast(error.message, ToastType.ERROR);
            },
        );
    }, [dispatch]);

    return (
        <>
            {resumeViews.map(({ resumeId, image, updatedAt, views, title }) => {
                return (
                    <NavLink key={resumeId} to={`/resumes/${resumeId}`}>
                        <ResumeCard
                            title={title}
                            image={image ?? ''}
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
