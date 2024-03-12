import { DataStatus } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useParams,
} from '~/bundles/common/hooks/hooks';
import { actions as resumeActions } from '~/bundles/resume/store/resume.store';
import { type ResumeGetAllResponseDto } from '~/bundles/resume/types/types';

type UseResumesReturnValues = {
    userId: string | undefined;
    resumes: ResumeGetAllResponseDto[];
};

const useResumes = (): UseResumesReturnValues => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const { userId, resumes, dataStatus } = useAppSelector(
        ({ auth, resumes }) => ({
            userId: auth.user?.id,
            resumes: resumes.resumes,
            dataStatus: resumes.dataStatus,
        }),
    );

    useEffect(() => {
        if (id) {
            void dispatch(resumeActions.getCurrentResumeWithTemplate(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (dataStatus === DataStatus.IDLE) {
            void dispatch(resumeActions.getAllResumes());
        }
    }, [dataStatus, dispatch]);

    return {
        userId,
        resumes,
    };
};

export { useResumes };
