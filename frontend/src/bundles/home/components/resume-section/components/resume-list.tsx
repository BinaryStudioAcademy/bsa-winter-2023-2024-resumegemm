import { NavLink } from 'react-router-dom';
import { type ResumeViewsCountResponseDto } from 'shared/build';

import {
    useAppDispatch,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { actions as resumeActions } from '~/bundles/resume/store/resume.store';
import { CommonMessage } from '~/bundles/toast/enums/common-message.enum';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';
import { showToast } from '~/bundles/toast/helpers/show-toast';

import { ResumeCard } from '../../components';
import styles from './styles.module.scss';

type Properties = {
    resumes?: ResumeViewsCountResponseDto[];
};

const ResumeList: React.FC<Properties> = ({ resumes }) => {
    const dispatch = useAppDispatch();

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
            {resumes && resumes.length > 0 ? (
                resumes.map(({ resumeId, image, updatedAt, views, title }) => {
                    return (
                        <NavLink key={resumeId} to={`/resumes/${resumeId}`}>
                            <ResumeCard
                                title={title}
                                image={image}
                                subtitle={`Updated - ${updatedAt}`}
                                viewedResume={views}
                                onDelete={deleteResume}
                            />
                        </NavLink>
                    );
                })
            ) : (
                <p className={styles.template_not_found_message}>
                    No results found for your search
                </p>
            )}
        </>
    );
};

export { ResumeList };
