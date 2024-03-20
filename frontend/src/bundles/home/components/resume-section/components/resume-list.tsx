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
                .then(() => {
                    showToast(
                        CommonMessage.SUCCESS_DELETE_RESUME,
                        ToastType.INFO,
                        {
                            position: 'top-right',
                        },
                    );
                    void dispatch(resumeActions.getViewsCountByUserId());
                });
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
            {resumeViews.map(({ id, image, updatedAt, views, resumeTitle }) => {
                return (
                    <NavLink key={id} to={`/resumes/${id}`}>
                        <ResumeCard
                            title={resumeTitle}
                            image={image ?? ''}
                            subtitle={`Updated - ${updatedAt}`}
                            viewedResume={views}
                            onDelete={deleteResume}
                            id={id}
                        />
                    </NavLink>
                );
            })}
        </>
    );
};

export { ResumeList };